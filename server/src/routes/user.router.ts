import express from "express";
import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRouter = express.Router();

const prefix = "/users";

userRouter.post(
  `${prefix}`,
  authMiddleware.validateAdmin,
  userController.create
);

export default userRouter;
