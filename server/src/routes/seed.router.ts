import express from "express";
import { seedController } from "../controllers/seed.controller";

const seedRouter = express.Router();

const prefix = "/seed";

seedRouter.get(`${prefix}`, seedController.seed);

export default seedRouter;
