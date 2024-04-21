import { Router } from "express";
import {
  addFavoriteController,
  createUserController,
  deleteUserController,
  listUserController,
  listUsersController,
  patchUserController,
  removeFavoriteController,
} from "../controllers/users.controllers";

import ensureIsAdminMiddleware from "../middlewares/ensureIsAdmin.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureUserExistsMiddleware from "../middlewares/ensureUserExist.middleware";
import { userSchema, updateUser } from "../schemas/user.schema";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchema),
  createUserController
);

userRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  listUsersController
);

userRoutes.get("/:id", ensureTokenIsValidMiddleware, listUserController);

userRoutes.delete(
  "/:id",
  ensureDataIsValidMiddleware(userSchema),
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  deleteUserController
);

userRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(updateUser),
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  patchUserController
);

//FAVORITES
userRoutes.post(
  "/:id/favorite",
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  addFavoriteController
);
userRoutes.delete(
  "/:id/:productId",
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  removeFavoriteController
);

export default userRoutes;
