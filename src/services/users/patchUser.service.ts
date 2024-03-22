import { hashSync } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { IUserReturn, RepoUser } from "../../interfaces/user.interface";
import { returnUserSchemaComplete } from "../../schemas/user.schema";

const patchUserService = async (
  oldUser: User,
  newUser: User | null,
  id: number,
  currentId: number,
  newPassword: string
): Promise<IUserReturn> => {

  if (id !== currentId) {
    throw new AppError("Insufficient permission", 403);
  }

  const userRepository: RepoUser = AppDataSource.getRepository(User);

  const hashedPassword = hashSync(newPassword, 10); // Aplica hash na nova senha
  await userRepository.update(id, { ...newUser, password: hashedPassword });
  await userRepository.update(id, newUser || oldUser);


  const updateUserResult = await userRepository.findOne({
    where: {
      id,
    },
  });
  console.log(id)
  console.log(currentId)
  return returnUserSchemaComplete.parse(updateUserResult);
};

export default patchUserService;