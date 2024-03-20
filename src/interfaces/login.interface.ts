import { z } from "zod/lib";
import { createLoginSchema } from "../schemas/login.schema";

export type ILogin = z.infer<typeof createLoginSchema>
