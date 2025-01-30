import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/products.entity";
import { IProductsReturn, RepoProduct } from "../../interfaces/product.interface";
import { returnMultipleProductSchema } from "../../schemas/product.schema";

const listProductsService = async (): Promise<IProductsReturn> => {
  const repoProduct: RepoProduct = AppDataSource.getRepository(Product);
  const findProducts: Array<Product> = await repoProduct.find();

  const validProducts = findProducts.map((product) => {
    const validProduct = {
      ...product,
      price: parseFloat(product.price.toString()),
      createdAt: new Date(new Date(product.createdAt).getTime() + new Date().getTimezoneOffset() * 60000).toLocaleDateString("pt-BR"),
      updatedAt: new Date(new Date(product.createdAt).getTime() + new Date().getTimezoneOffset() * 60000).toLocaleDateString("pt-BR"),
      deletedAt: product.deletedAt
        ? new Date(new Date(product.createdAt).getTime() + new Date().getTimezoneOffset() * 60000).toLocaleDateString("pt-BR")
        : null,
    };
    return validProduct;
  });

  const products = returnMultipleProductSchema.parse(validProducts);
  return products;
};
 export default listProductsService