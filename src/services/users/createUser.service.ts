import { DeepPartial } from "typeorm"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors"
import { IUser, IUserReturn, RepoUser } from "../../interfaces/user.interface"
import { returnUserSchemaComplete } from "../../schemas/user.schema"




const createUserService = async (userData: IUser): Promise<IUserReturn> => {

    const userRepository: RepoUser = AppDataSource.getRepository(User)

    const existingUser = await userRepository.findOne({
        where: {
            email: userData.email
        }
    })
    if (existingUser) {
        throw new AppError('Email already exists', 409)
    }

    const user: User = userRepository.create(userData as DeepPartial<User>)

    await userRepository.save(user)

    const newUser = returnUserSchemaComplete.parse(user)

    return newUser
}

export default createUserService