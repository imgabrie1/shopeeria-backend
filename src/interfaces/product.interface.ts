import { z } from "zod"
import { DeepPartial, Repository } from "typeorm"
import { productSchema, returnMultipleProductSchema, returnProductSchema } from "../schemas/product.schema"
import { Product } from "../entities/products.entity"
import { Favorite } from "../entities/favorites.entity"

export type IProduct = z.infer<typeof productSchema>
export type IProductReturn = z.infer<typeof returnProductSchema>
export type IProductsReturn = z.infer<typeof returnMultipleProductSchema>
export type IProductUpdate = DeepPartial<IProductReturn>

export type RepoProduct = Repository<Product>
export type RepoFav = Repository<Favorite>
