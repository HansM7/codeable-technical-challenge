import { ILogin } from "../models/interfaces/auth.interface";
import { IUser } from "../models/interfaces/user.interface";
import { httpService } from "./response.service";
import { userService } from "./user.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class AuthService {
  async login(data: ILogin) {
    try {
      const res_user = await userService.findUser(data.email);
      if (!res_user.response.ok) return res_user;
      const user = res_user.response.data as IUser;
      const res_compare = await bcrypt.compare(data.password, user.password);

      if (!res_compare || user.role !== "admin")
        return httpService.http401("Error in authentication");

      const token = jwt.sign({ id: user.id }, "secret-auth");
      return httpService.http200("Authentication successful", { token });
    } catch (error) {
      return httpService.http500("Error in login", error);
    }
  }

  async validateAdmin(token: string) {
    try {
      const { id }: any = jwt.verify(token, "secret-auth");
      const res_user = await userService.findUser(id.toString());
      if (!res_user.response.ok) return res_user;
      const user = res_user.response.data as IUser;
      if (user.role !== "admin")
        return httpService.http401("Error in authentication");
      return httpService.http200("Authentication successful");
    } catch (error) {
      return httpService.http500("Error in login", error);
    }
  }
}

export const authService = new AuthService();
