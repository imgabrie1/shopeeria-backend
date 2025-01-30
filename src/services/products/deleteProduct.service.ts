import { AppDataSource } from "../../data-source"
import { Favorite } from "../../entities/favorites.entity"
import { Product } from "../../entities/products.entity"
import { RepoFav, RepoProduct } from "../../interfaces/product.interface"



const deleteProductService = async (productId: number): Promise<void> => {
    const productRepository: RepoProduct = AppDataSource.getRepository(Product)
    const favoriteRepository: RepoFav = AppDataSource.getRepository(Favorite)

    await favoriteRepository.delete({product: {id: productId}})

    const user = await productRepository.findOne({
        where: {
            id: productId
        }
    })
    await productRepository.softRemove(user!)
}

export default deleteProductService