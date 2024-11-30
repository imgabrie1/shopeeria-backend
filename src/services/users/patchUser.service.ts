import { hashSync } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { IUserReturn, RepoUser } from "../../interfaces/user.interface";
import { returnUserSchemaComplete } from "../../schemas/user.schema";

const patchUserService = async (
  oldUser: User,
  updateData: Partial<User>,
  id: string,
  currentId: string
): Promise<IUserReturn> => {

  if (id !== currentId) {
    throw new AppError("Insufficient permission", 403);
  }

  const userRepository: RepoUser = AppDataSource.getRepository(User);

  await userRepository.update(id, updateData);

  const updateUserResult = await userRepository.findOne({
    where: {
      id,
    },
  });

  return returnUserSchemaComplete.parse(updateUserResult);
};

export default patchUserService;