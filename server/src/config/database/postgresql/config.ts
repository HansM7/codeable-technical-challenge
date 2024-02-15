import { pool } from "./connection";

export const query = (text: string, params?: (string | number | boolean)[]) => {
  return pool.query(text, params);
};
