import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { ILogin } from "../models/interfaces/auth.interface";
import { httpService } from "../services/response.service";

class AuthController {
  async Login(req: Request, res: Response) {
    const data: ILogin = req.body;
    const response = await authService.login(data);
    res.status(response.code).json(response.response);
  }

  async me(req: Request, res: Response) {
    const response = httpService.http200("Validation ok!");
    res.status(response.code).json(response.response);
  }
}

export const authController = new AuthController();
