import { string, z } from "zod";
// import { Category } from "../entities/products.entity";




export const productSchema = z.object({
    productName: z.string().max(45).min(2),
    description: z.string().max(120).min(2),
    category: z.array(z.string())
})

export const returnProductSchema = productSchema.extend({
    id: z.number()
})

export const returnProductSchemaComplete = returnProductSchema.extend({
    createdAt: z.date().or(string()),
    updatedAt: z.date().or(string()),
    deletedAt: z.date().or(string()).nullable()
})

// export const updateProduct = productSchema.partial().omit({ admin: true })

export const returnMultipleProductSchema = returnProductSchemaComplete.array()