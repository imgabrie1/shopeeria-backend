import { AppDataSource } from "../../data-source";
import { Favorite } from "../../entities/favorites.entity";
import { AppError } from "../../errors";

const removeFavoriteService = async (userId: number, productId: number): Promise<void> => {
    const favoriteRepository = AppDataSource.getRepository(Favorite);

    const favorite = await favoriteRepository.findOne({
      where: {
        user: { id: userId },
        product: { id: productId }
      }
    });

    if (!favorite) {
      throw new AppError("Produto favorito não encontrado", 404);
    }

    await favoriteRepository.remove(favorite);
  };

export default removeFavoriteService