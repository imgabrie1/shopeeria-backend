import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUsersReturn, RepoUser } from "../../interfaces/user.interface";
import { returnMultipleUserSchema, returnUserSchema } from "../../schemas/user.schema";



const listUsersService = async (): Promise<IUsersReturn> => {
    const userRepository: RepoUser = AppDataSource.getRepository(User);
    const findUsers: Array<User> = await userRepository.find({
      relations: ['favorites', 'favorites.product']
    });
    const users = returnMultipleUserSchema.parse(findUsers);
    return users;
  };



export default listUsersService