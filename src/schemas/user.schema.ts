import { string, z } from "zod";

export const userSchema = z.object({
    name: z.string().max(45),
    email: z.string().max(45).email(),
    admin: z.boolean().default(false),
    password: z.string().max(120),
})

export const returnUserSchema = userSchema.extend({
    id: z.number()
}).omit({ password: true })

export const returnUserSchemaComplete = returnUserSchema.extend({
    createdAt: z.date().or(string()),
    updatedAt: z.date().or(string()),
    deletedAt: z.date().or(string()).nullable()
})

export const updateUser = userSchema.partial().omit({ admin: true })

export const returnMultipleUserSchema = returnUserSchemaComplete.array()