import { query } from "../config/database/postgresql/config";
import { IUser, IUserTemplate } from "../models/interfaces/user.interface";

class UserQuery {
  private readonly table = "users";

  async findUserForEmail(email: string) {
    const sql = `select*from ${this.table} where email=$1`;
    const response = await query(sql, [email]);
    return response.rows[0];
  }

  async findUserForId(id: string) {
    const sql = `select*from ${this.table} where id=$1`;
    const response = await query(sql, [id]);
    return response.rows[0];
  }

  async createUser(data: IUserTemplate, password: string) {
    const sql = `insert into ${this.table}(email, name, age, password) values($1, $2, $3,$4) returning*`;
    const response = await query(sql, [
      data.email,
      data.name,
      data.age,
      password,
    ]);
    return response.rows[0];
  }

  async createUserForSeed(data: IUser) {
    const sql = `insert into ${this.table}(email, name, age, role, password) values($1, $2, $3, $4, $5)`;
    await query(sql, [
      data.email,
      data.name,
      data.age,
      data.role,
      data.password,
    ]);
  }
}

export const userQuery = new UserQuery();
