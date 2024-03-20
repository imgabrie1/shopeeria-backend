import { Router } from "express";
import { productSchema } from "../schemas/product.schema";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { createProductController, deleteProductController, listProductsController, patchProductController } from "../controllers/products.controllers";
import ensureIsAdminMiddleware from "../middlewares/ensureIsAdmin.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import { ensureCategoryIsValidMiddleware } from "../middlewares/ensureCategoryIsValid.middleware";


const productRoutes: Router = Router()

productRoutes.post("",
ensureDataIsValidMiddleware(productSchema),
ensureTokenIsValidMiddleware,
ensureIsAdminMiddleware,
ensureCategoryIsValidMiddleware,
createProductController)

productRoutes.delete("/:id", ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, deleteProductController)

productRoutes.patch("/:id",
ensureDataIsValidMiddleware(productSchema),
ensureTokenIsValidMiddleware,
ensureIsAdminMiddleware,
ensureCategoryIsValidMiddleware,
patchProductController)

productRoutes.get("", listProductsController)

export default productRoutes