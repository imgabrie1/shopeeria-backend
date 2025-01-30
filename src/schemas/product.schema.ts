import { string, z } from "zod";




export const productSchema = z.object({
    productName: z.string().max(45).min(2),
    description: z.string().max(120).min(2),
    category: z.array(z.string()),
    img: z.string(),
    link: z.string(),
    price: z.number()
})

export const productSchemaPartial = z.object({
    productName: z.string().max(45).min(2),
    description: z.string().max(120).min(2),
    category: z.array(z.string()),
    img: z.string(),
    link: z.string(),
    price: z.number()
}).partial()

export const returnProductSchema = productSchema.extend({
    id: z.number()
})

export const returnProductSchemaComplete = returnProductSchema.extend({
    createdAt: z.date().or(string()),
    updatedAt: z.date().or(string()),
    deletedAt: z.date().or(string()).nullable()
})

export const returnMultipleProductSchema = returnProductSchemaComplete.array()