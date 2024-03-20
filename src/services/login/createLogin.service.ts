import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import "dotenv/config";
import { User } from "../../entities/user.entity";
import { RepoUser } from "../../interfaces/user.interface";
import { ILogin } from "../../interfaces/login.interface";

const createLoginService = async (loginData: ILogin): Promise<string> => {

    const userRepository: RepoUser = AppDataSource.getRepository(User)

    const user: User | null = await userRepository.findOneBy({
        email: loginData.email
    })

    if(!user){
        throw new AppError("Invalid credentials", 401)
    }

    const passwordMatch = await compare(loginData.password, user.password)

    if(!passwordMatch){
        throw new AppError("Invalid credentials", 401)
    }

    const token: string = jwt.sign(
        {
            admin: user.admin
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: "24h",
            subject: String(user.id)
        }
    )

    return token
}

export default createLoginService