export interface IUserTemplate {
  email: string;
  name: string;
  age: string;
}

export interface IUser extends IUserTemplate {
  id?: number;
  role: string;
  password: string;
}
