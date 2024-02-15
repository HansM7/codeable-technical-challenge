import { z } from "zod";

export const userDTO = z.object({
  name: z.union([z.number(), z.string()]),
  email: z.union([z.number(), z.string()]),
  age: z.union([z.number(), z.string()]),
});
