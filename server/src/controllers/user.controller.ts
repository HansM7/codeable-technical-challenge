import { Request, Response } from "express";
import { IUserTemplate } from "../models/interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
  async create(req: Request, res: Response) {
    const data: IUserTemplate = req.body;
    const response = await userService.create(data);
    res.status(response.code).json(response.response);
  }
}

export const userController = new UserController();
