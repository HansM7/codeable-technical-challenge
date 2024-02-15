import { IUser } from "../models/interfaces/user.interface";
import { users } from "../models/seed";
import { httpService } from "./response.service";
import { userService } from "./user.service";
import bcrypt from "bcrypt";

class SeedService {
  async seed() {
    try {
      users.map(async (user) => {
        const newPassword = await bcrypt.hash(user.password, 11);
        await userService.createForSeed({ ...user, password: newPassword });
      });

      return httpService.http200("Seed executed successfully!");
    } catch (error) {
      return httpService.http500("Error in seed service", error);
    }
  }
}

export const seedService = new SeedService();
