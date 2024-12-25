import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { user } from "./schema";

export const selectUserSchema = createSelectSchema(user);
export type SelectUserType = z.infer<typeof selectUserSchema>;
