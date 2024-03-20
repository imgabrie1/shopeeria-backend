import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/products.entity";
import { AppError } from "../../errors";
import { IProduct, IProductReturn, RepoProduct } from "../../interfaces/product.interface";



const patchProductService = async (productId: number, updateData: Partial<IProduct>): Promise<Product | null> => {
    const productRepository: RepoProduct = AppDataSource.getRepository(Product);

    const product = await productRepository.findOneBy({
        id: productId
    });

    if (!product) {
        throw new AppError("Product not found", 404);
    }

    await productRepository.update(productId, updateData);

    const updatedProduct = await productRepository.findOneBy({ id: productId });
    return updatedProduct;
}

export default patchProductService;
