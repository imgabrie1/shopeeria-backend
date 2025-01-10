import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUsersReturn, RepoUser } from "../../interfaces/user.interface";
import { returnMultipleUserSchema } from "../../schemas/user.schema";

const listUsersService = async (): Promise<IUsersReturn> => {
  const userRepository: RepoUser = AppDataSource.getRepository(User);
  const findUsers: Array<User> = await userRepository.find({
    relations: ['favorites', 'favorites.product']
  });

  const users = findUsers.map(user => ({
    ...user,
    favorites: user.favorites.map(favorite => ({
      ...favorite,
      product: {
        ...favorite.product,
        price: Number(favorite.product.price)
      }
    }))
  }));

  const parsedUsers = returnMultipleUserSchema.parse(users);
  return parsedUsers;
};

export default listUsersService;
