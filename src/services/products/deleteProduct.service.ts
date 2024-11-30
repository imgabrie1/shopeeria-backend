import { AppDataSource } from "../../data-source"
import { Product } from "../../entities/products.entity"
import { RepoProduct } from "../../interfaces/product.interface"



const deleteProductService = async (productId: string): Promise<void> => {
    const productRepository: RepoProduct = AppDataSource.getRepository(Product)

    const user = await productRepository.findOne({
        where: {
            id: productId
        }
    })
    await productRepository.softRemove(user!)
}

export default deleteProductService