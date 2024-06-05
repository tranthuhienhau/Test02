import {Router} from "express";
import userController from "../controller/userController.js";
const userRouter = Router();
userRouter.post("/userRouter", userController.register)
userRouter.get("/login", userController.login)
export default userRouter;