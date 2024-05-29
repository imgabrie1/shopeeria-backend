import "express-async-errors";
import { handleErrors } from "./errors";
import api from "../api"
import express, { Application } from "express";
import userRoutes from "./routers/users.routes";
import loginRoutes from "./routers/login.routes";
import productRoutes from "./routers/products.routes";

const app: Application = express()
app.use(express.json())


app.use("/users", userRoutes)
app.use("/product", productRoutes)
app.use("/login", loginRoutes)

app.use("/api/v1", api)

app.use(handleErrors)
export default app