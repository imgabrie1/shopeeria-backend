import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/products.entity";
import { IProduct, RepoProduct } from "../../interfaces/product.interface";
import { productSchema } from "../../schemas/product.schema";

const createProductService = async (data: IProduct): Promise<Product> => {
  const repoProduct: RepoProduct = AppDataSource.getRepository(Product);
  if (typeof data.price === "string") {

    data.price = parseFloat(data.price);
  }

  const product = productSchema.parse(data);

  const newProduct: Product = repoProduct.create(product);

  await repoProduct.save(newProduct);

  return newProduct;
};
export default createProductService;
