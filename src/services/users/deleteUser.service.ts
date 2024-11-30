import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { RepoUser } from "../../interfaces/user.interface"


const deleteUserService = async (userId: string): Promise<void> => {
    const userRepository: RepoUser = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
        where: {
            id: userId
        }
    })
    await userRepository.softRemove(user!)
}

export default deleteUserService