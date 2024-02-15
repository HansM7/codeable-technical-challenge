import express from "express";
import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRouter = express.Router();

const prefix = "/auth";

authRouter.post(`${prefix}/login`, authMiddleware.login, authController.Login);
authRouter.get(`${prefix}/me`, authMiddleware.validateAdmin, authController.me);

export default authRouter;
