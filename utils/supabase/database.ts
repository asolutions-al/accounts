import * as relations from "@/supabase/migrations/relations"
import * as sch from "@/supabase/migrations/schema"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

const client = postgres(process.env.DATABASE_URL!, { prepare: false })

const db = drizzle(client, {
  schema: {
    ...sch,
    ...relations,
  },
})

export { db }
