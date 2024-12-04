import "express-async-errors";
import { handleErrors } from "./errors";
import express, { Application } from "express";
import userRoutes from "./routers/users.routes";
import loginRoutes from "./routers/login.routes";
import productRoutes from "./routers/products.routes";
import cors from "cors";
import bodyParser from "body-parser"

const app: Application = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())


app.use("/users", userRoutes)
app.use("/product", productRoutes)
app.use("/login", loginRoutes)


app.use(handleErrors)
export default app