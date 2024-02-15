import express from "express";
import multer from "multer";
import { fileController } from "../controllers/file.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const fileRouter = express.Router();

const prefix = "/uploads";

const upload = multer({ storage: multer.memoryStorage() });

fileRouter.post(
  `${prefix}`,
  authMiddleware.validateAdmin,
  upload.single("file"),
  fileController.upload
);
fileRouter.post(
  `${prefix}/validate`,
  authMiddleware.validateAdmin,
  upload.single("file"),
  fileController.validate
);

export default fileRouter;
