import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUsersController,
  patchUserController,
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

userRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  ensureIsAdminMiddleware,
  deleteUserController
);

userRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(updateUser),
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  patchUserController
);

export default userRoutes;
