import { Request, Response } from "express";
import { hashSync } from "bcryptjs";
import { IUser, IUserReturn } from "../interfaces/user.interface";
import createUserService from "../services/users/createUser.service";
import listUsersService from "../services/users/listUsers.service";
import deleteUserService from "../services/users/deleteUser.service";
import patchUserService from "../services/users/patchUser.service";
import listUserService from "../services/users/listUser.service";
import { AppError } from "../errors";
import addFavoriteService from "../services/favorites/addFavorite.service";
import removeFavoriteService from "../services/favorites/removeFavorite.service";


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

export const listUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {

  const UserId: number = parseInt(req.params.id);
  const user = await listUserService(UserId);
  return res.status(200).json(user);
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
  const idParams: number = parseInt(req.params.id);
  const currentId: number = req.id


  let newPassword = req.body.password;
  let updateData = { ...req.body };

  if (newPassword) {
    newPassword = hashSync(newPassword, 10);
    updateData.password = newPassword;
  }
  else {
    delete updateData.password;
  }

  const user: IUserReturn = await patchUserService(
    req.user,
    { ...req.body, password: newPassword },
    idParams,
    currentId,
  );

  return res.status(200).json(user);
};


//FAVORITES
export const addFavoriteController = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = parseInt(req.params.id);
  const { productId } = req.body;

  try {
    const favorite = await addFavoriteService(userId, productId);
    if (!favorite) {
      return res.status(404).json({ message: "Produto favoritado não encontrado" });
    }

    return res.status(201).json({
      favorite: {
        id: favorite.id,
        user: {
          id: favorite.user.id,
          name: favorite.user.name,
          email: favorite.user.email,
          admin: favorite.user.admin,
          createdAt: favorite.user.createdAt,
          updatedAt: favorite.user.updatedAt,
        },
        product: {
          id: favorite.product.id,
          productName: favorite.product.productName,
          description: favorite.product.description,
          category: favorite.product.category,
          createdAt: favorite.product.createdAt,
          updatedAt: favorite.product.updatedAt,
        }
      }
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(409).json({ message: "Item já favoritado" });
  }
};


export const removeFavoriteController = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = parseInt(req.params.id)
  const productId: number = parseInt(req.params.productId)

  try {
    await removeFavoriteService(userId, productId);
    return res.status(204).send();
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(409).json({ message: "Item já removido" });
  }
};



