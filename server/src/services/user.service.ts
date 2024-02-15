import { isEmail, isInt } from "validator";
import { IUser, IUserTemplate } from "../models/interfaces/user.interface";
import { userQuery } from "../queries/user.query";
import { httpService } from "./response.service";

class UserService {
  async findUser(filter: any) {
    try {
      let res_user;
      if (isEmail(filter)) res_user = await userQuery.findUserForEmail(filter);
      if (!isNaN(filter)) res_user = await userQuery.findUserForId(filter);
      if (!res_user) return httpService.http400("User not found");
      return httpService.http200("User found", res_user);
    } catch (error) {
      return httpService.http500("Error in find user", error);
    }
  }

  async create(data: IUserTemplate) {
    try {
      const response = await userQuery.createUser(data, "");
      return httpService.http200("User created", response);
    } catch (error) {
      return httpService.http500("Error in create user", error);
    }
  }

  async createForSeed(data: IUser) {
    try {
      await userQuery.createUserForSeed(data);
    } catch (error) {}
  }
}

export const userService = new UserService();
