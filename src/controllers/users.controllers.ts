import { Request, Response } from "express";
import { IUser } from "../interfaces/user.interface"
import createUserService from "../services/users/createUser.service"
import listUsersService from "../services/users/listUsers.service";
import deleteUserService from "../services/users/deleteUser.service";

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const userData: IUser = req.body

    const newUser = await createUserService(userData)

    return res.status(201).json(newUser)
}


export const listUsersController = async (req: Request, res: Response): Promise<Response> => {
    const users = await listUsersService()

    return res.status(200).json(users)
}


export const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
    const paramId: number = parseInt(req.params.id)

    await deleteUserService(paramId)

    return res.status(204).send()
}

