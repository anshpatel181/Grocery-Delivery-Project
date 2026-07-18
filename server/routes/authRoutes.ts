import express from "express"
import { authMiddlware } from "../middlewares/authMiddleware.js";
import { login, register } from "../controller/authController.js"

const authRouter = express.Router();

authRouter.post("/register", authMiddlware, register)
authRouter.post("/login", authMiddlware, login)

export default authRouter
