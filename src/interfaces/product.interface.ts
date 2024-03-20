import { z } from "zod"
import { returnMultipleUserSchema, returnUserSchema, updateUser, userSchema } from "../schemas/user.schema"
import { Repository } from "typeorm"
// import { User } from "../entities/user.entity"
import { productSchema, returnMultipleProductSchema, returnProductSchema } from "../schemas/product.schema"
import { Product } from "../entities/products.entity"

export type IProduct = z.infer<typeof productSchema>
export type IProductReturn = z.infer<typeof returnProductSchema>
export type IProductsReturn = z.infer<typeof returnMultipleProductSchema>
// export type IProductUpdate = z.infer<typeof updateProduct>

export type RepoProduct = Repository<Product>
