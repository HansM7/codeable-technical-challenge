import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { httpService } from "../services/response.service";
import { authDTO } from "../models/dto/auth.dto";
import { authService } from "../services/auth.service";

class AuthMiddleware {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      authDTO.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const response = httpService.http400(
          "Error in authentication",
          error.issues
        );
        res.status(response.code).json(response.response);
      } else {
        const response = httpService.http500("Error in authentication", error);
        res.status(response.code).json(response.response);
      }
    }
  }

  async validateAdmin(req: Request, res: Response, next: NextFunction) {
    const token = req.get("Authorization");

    if (token) {
      const response = await authService.validateAdmin(token);
      if (!response.response.ok)
        res.status(response.code).json(response.response);
      else next();
    } else {
      const response = httpService.http400("Error server");
      res.status(response.code).json(response.response);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
