import { AppDataSource } from "../../data-source"
import { Product } from "../../entities/products.entity"
import { IProductReturn, IProductUpdate, RepoProduct } from "../../interfaces/product.interface"
import { returnProductSchema } from "../../schemas/product.schema"

const patchProductService = async (
    paramId: number,
    data: IProductUpdate,
): Promise<IProductReturn> => {
    const productRepository: RepoProduct = AppDataSource.getRepository(Product)
    const oldProduct = await productRepository.findOneBy({
        id: paramId,
    })

    if (data.price) {
        data.price = typeof data.price === "string" ? parseFloat(data.price) : data.price;
    }

    const updatedProductData = {
        ...oldProduct,
        ...data,
    }

    if (updatedProductData.price && typeof updatedProductData.price === "string") {
        updatedProductData.price = parseFloat(updatedProductData.price);
    }

    const updatedProduct = productRepository.create(updatedProductData)

    await productRepository.save(updatedProduct)
    const returnedProduct = returnProductSchema.parse(updatedProduct)

    return returnedProduct
}

export default patchProductService
