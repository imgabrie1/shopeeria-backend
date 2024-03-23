import { Request, Response } from "express";
import { getRounds, hashSync } from "bcryptjs";
import { IUser, IUserReturn, IUserUpdate } from "../interfaces/user.interface";
import createUserService from "../services/users/createUser.service";
import listUsersService from "../services/users/listUsers.service";
import deleteUserService from "../services/users/deleteUser.service";
import patchUserService from "../services/users/patchUser.service";


export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: IUser = req.body;

  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

export const listUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await listUsersService();

  return res.status(200).json(users);
};

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const paramId: number = parseInt(req.params.id);

  await deleteUserService(paramId);

  return res.status(204).send();
};

export const patchUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const idParams: number = Number(req.params.id);
  const currentId: number = req.id;


  let newPassword = req.body.password;
  let updateData = { ...req.body };

  if (newPassword) {
    newPassword = hashSync(newPassword, 10);
    updateData.password = newPassword;
  }
  else {
    delete updateData.password; // Remove a senha do objeto de atualização se não houver uma nova
  }

  const user: IUserReturn = await patchUserService(
    req.user,
    { ...req.body, password: newPassword },
    idParams,
    currentId,
  );

  return res.status(200).json(user);
};
