import { z } from "zod";

export const authDTO = z.object({
  email: z
    .string()
    .email({ message: "This field must be a valid email address" }),
  password: z.string(),
});
