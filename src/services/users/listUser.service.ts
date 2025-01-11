import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserReturn, RepoUser } from "../../interfaces/user.interface";
import { returnUserSchema } from "../../schemas/user.schema";

const listUserService = async (id: number): Promise<IUserReturn | null> => {
  const userRepository: RepoUser = AppDataSource.getRepository(User);
  const user: User | null = await userRepository.findOne({
    where: { id },
    relations: ["favorites", "favorites.product"],
  });

  if (user) {
    user.favorites = user.favorites || [];
    user.favorites = user.favorites.map((favorite) => {
      if (favorite.product) {
        return {
          ...favorite,
          product: {
            ...favorite.product,
            price: Number(favorite.product.price),
          },
        };
      }
      return favorite;
    });
    const userFound = returnUserSchema.parse(user);
    return userFound;
  }

  return null;
};

export default listUserService;