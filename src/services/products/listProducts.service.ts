import { AppDataSource } from "../../data-source"
import { Product } from "../../entities/products.entity"
import { IProductsReturn, RepoProduct } from "../../interfaces/product.interface"
import { returnMultipleProductSchema } from "../../schemas/product.schema"

const listProductsService = async (): Promise<IProductsReturn> => {

    const productRepository: RepoProduct = AppDataSource.getRepository(Product)
    const findProducts: Array<Product> = await productRepository.find()
    const products = returnMultipleProductSchema.parse(findProducts)
    return products
}

export default listProductsService