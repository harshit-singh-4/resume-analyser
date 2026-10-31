import { z } from "zod";

/** 
* @name         registerSchema
* @description  check user schema of username,email,password .
* @access        public
*/
export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username cannot exceed 30 characters"),

  email: z
  .string()
  .trim()
  .pipe(z.email({ error: "Please enter a valid email address" }))
  .transform((email) => email.toLowerCase()),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(72, "Password cannot exceed 72 characters"),
});