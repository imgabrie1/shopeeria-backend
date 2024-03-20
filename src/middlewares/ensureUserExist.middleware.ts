import { Request, Response, NextFunction} from "express"
import { AppDataSource } from "../data-source"
import { AppError } from "../errors"
import { User } from "../entities/user.entity"
import { RepoUser } from "../interfaces/user.interface"

const ensureUserExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const userRepository: RepoUser = AppDataSource.getRepository(User)

    const findUser = await userRepository.findOne({
        where: {
            id: parseInt(req.params.id)
        }
    })

    if(!findUser){
        throw new AppError("User not found", 404)
    }

    req.user = findUser!

    return next()

}

export default ensureUserExistsMiddleware