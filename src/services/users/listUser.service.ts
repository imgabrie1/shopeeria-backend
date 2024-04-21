import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserReturn, RepoUser } from "../../interfaces/user.interface";
import { returnUserSchema } from "../../schemas/user.schema";

const listUserService = async (id: number): Promise<IUserReturn | null> => {
  const userRepository: RepoUser = AppDataSource.getRepository(User);
  const user: User | null = await userRepository.findOne({
    where: { id },
    relations: ['favorites', 'favorites.product']
  });
  if (user) {
    const userFound = returnUserSchema.parse(user);
    return userFound;
  }
  return null;
};

export default listUserService