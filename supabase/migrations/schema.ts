import { pgTable, uniqueIndex, index, foreignKey, pgEnum, text, timestamp, integer, uuid } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const aal_level = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const code_challenge_method = pgEnum("code_challenge_method", ['s256', 'plain'])
export const factor_status = pgEnum("factor_status", ['unverified', 'verified'])
export const factor_type = pgEnum("factor_type", ['totp', 'webauthn', 'phone'])
export const one_time_token_type = pgEnum("one_time_token_type", ['confirmation_token', 'reauthentication_token', 'recovery_token', 'email_change_token_new', 'email_change_token_current', 'phone_change_token'])
export const key_status = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const key_type = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const UserRole = pgEnum("UserRole", ['ADMIN', 'USER'])
export const action = pgEnum("action", ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR'])
export const equality_op = pgEnum("equality_op", ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in'])


export const sessions = pgTable("sessions", {
	id: text("id").primaryKey().notNull(),
	sessionToken: text("sessionToken").notNull(),
	userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" } ),
	expires: timestamp("expires", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		sessionToken_key: uniqueIndex("sessions_sessionToken_key").using("btree", table.sessionToken),
		userId_idx: index("sessions_userId_idx").using("btree", table.userId),
	}
});

export const users = pgTable("users", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	email: text("email"),
	emailVerified: timestamp("emailVerified", { precision: 3, mode: 'string' }),
	image: text("image"),
	created_at: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	role: UserRole("role").default('USER').notNull(),
	stripe_customer_id: text("stripe_customer_id"),
	stripe_subscription_id: text("stripe_subscription_id"),
	stripe_price_id: text("stripe_price_id"),
	stripe_current_period_end: timestamp("stripe_current_period_end", { precision: 3, mode: 'string' }),
},
(table) => {
	return {
		email_key: uniqueIndex("users_email_key").using("btree", table.email),
		stripe_customer_id_key: uniqueIndex("users_stripe_customer_id_key").using("btree", table.stripe_customer_id),
		stripe_subscription_id_key: uniqueIndex("users_stripe_subscription_id_key").using("btree", table.stripe_subscription_id),
	}
});

export const verification_tokens = pgTable("verification_tokens", {
	identifier: text("identifier").notNull(),
	token: text("token").notNull(),
	expires: timestamp("expires", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		identifier_token_key: uniqueIndex("verification_tokens_identifier_token_key").using("btree", table.identifier, table.token),
		token_key: uniqueIndex("verification_tokens_token_key").using("btree", table.token),
	}
});

export const accounts = pgTable("accounts", {
	id: text("id").primaryKey().notNull(),
	userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" } ),
	type: text("type").notNull(),
	provider: text("provider").notNull(),
	providerAccountId: text("providerAccountId").notNull(),
	refresh_token: text("refresh_token"),
	access_token: text("access_token"),
	expires_at: integer("expires_at"),
	token_type: text("token_type"),
	scope: text("scope"),
	id_token: text("id_token"),
	session_state: text("session_state"),
	created_at: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		provider_providerAccountId_key: uniqueIndex("accounts_provider_providerAccountId_key").using("btree", table.provider, table.providerAccountId),
		userId_idx: index("accounts_userId_idx").using("btree", table.userId),
	}
});

export const user = pgTable("user", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	email: text("email").notNull(),
});