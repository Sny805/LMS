import { Router } from "express";
import { getUserProfile, login, logout, register } from "../controllers/user.controller.js";

import { isAuthenticated } from "../middleware/isAuthenticated.js";

const userRouter = Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/profile").get(isAuthenticated, getUserProfile);
userRouter.route("/logout").get(logout);

export default userRouter;