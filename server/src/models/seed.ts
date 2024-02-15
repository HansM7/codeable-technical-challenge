import { IUser } from "./interfaces/user.interface";

export const users: IUser[] = [
  {
    email: "john@gmail.com",
    name: "John Doe",
    age: "30",
    role: "admin",
    password: "john",
  },
  {
    email: "jane.smith@example.com",
    name: "Jane Smith",
    age: "25",
    role: "user",
    password: "jane",
  },
  {
    email: "alice.johnson@example.com",
    name: "Alice Johnson",
    age: "35",
    role: "user",
    password: "alice",
  },
];
