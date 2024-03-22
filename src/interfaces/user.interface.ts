import { z } from "zod"
import { returnMultipleUserSchema, returnUserSchema, updateUser, userSchema } from "../schemas/user.schema"
import { DeepPartial, Repository } from "typeorm"
import { User } from "../entities/user.entity"

export type IUser = z.infer<typeof userSchema>
export type IUserReturn = z.infer<typeof returnUserSchema>
export type IUsersReturn = z.infer<typeof returnMultipleUserSchema>
export type IUserUpdate = DeepPartial<IUser>

export type RepoUser = Repository<User>
