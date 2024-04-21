import { AppDataSource } from "../../data-source";
import { Favorite } from "../../entities/favorites.entity";
import { Product } from "../../entities/products.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";

export const addFavoriteService = async (userId: number, productId: number): Promise<Favorite> => {
  const userRepository = AppDataSource.getRepository(User);
  const productRepository = AppDataSource.getRepository(Product);
  const favoriteRepository = AppDataSource.getRepository(Favorite);

  const user = await userRepository.findOne({
    where: { id: userId },
    relations: ["favorites", "favorites.product"]
  });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const product = await productRepository.findOneBy({ id: productId });
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  const existingFavorite = await favoriteRepository.findOne({
    where: {
      user: { id: userId },
      product: { id: productId }
    }
  });

  if (existingFavorite) {
    return existingFavorite;
  }

  const favorite = favoriteRepository.create({
    user,
    product
  });

  await favoriteRepository.save(favorite);

  const fullFavorite = await favoriteRepository.findOne({
    where: { id: favorite.id },
    relations: ["user", "product"]
  });

  if (!fullFavorite) {
    throw new AppError("Favorite not found after saving", 404);
  }

  return fullFavorite;
};
