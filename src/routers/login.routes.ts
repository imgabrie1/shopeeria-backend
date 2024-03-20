import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import createLoginController from "../controllers/login.controller";
import { createLoginSchema } from "../schemas/login.schema";

const loginRoutes: Router = Router()

loginRoutes.post("/", ensureDataIsValidMiddleware(createLoginSchema), createLoginController)

export default loginRoutes