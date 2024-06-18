import "express-async-errors";
import { handleErrors } from "./errors";
import express, { Application } from "express";
import cors from "cors";
import userRoutes from "./routers/users.routes";
import loginRoutes from "./routers/login.routes";
import productRoutes from "./routers/products.routes";

const app: Application = express()
app.use(express.json())


app.use(cors({
    origin: "http://localhost:5173"
  }));
app.use("/users", userRoutes)
app.use("/product", productRoutes)
app.use("/login", loginRoutes)

app.use(handleErrors)
export default app