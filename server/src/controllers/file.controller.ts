import { Request, Response } from "express";
import { fileService } from "../services/file.service";
import { httpService } from "../services/response.service";

class FileController {
  async upload(req: Request, res: Response) {
    if (req.file) {
      const response = await fileService.upload(
        req.file.buffer,
        req.file.originalname
      );
      return res.status(response.code).json(response.response);
    } else {
      const response = httpService.http400("Error uploading file");
      return res.status(response.code).json(response.response);
    }
  }

  async validate(req: Request, res: Response) {
    if (req.file) {
      const response = await fileService.validateStructure(
        req.file.buffer,
        req.file.originalname
      );
      return res.status(response.code).json(response.response);
    } else {
      const response = httpService.http400("Error uploading file");
      return res.status(response.code).json(response.response);
    }
  }
}

export const fileController = new FileController();
