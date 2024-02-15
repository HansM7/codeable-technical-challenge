import { Request, Response } from "express";
import { seedService } from "../services/seed.service";

// no authentication required
class SeedController {
  async seed(req: Request, res: Response) {
    const response = await seedService.seed();
    res.status(response.code).json(response.response);
  }
}

export const seedController = new SeedController();
