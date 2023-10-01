import * as z from "zod";

const PASSWORD_REGEX = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"
); // 1 uppercase, 1 lowercase, 1 number, 1 special

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const registerSchema = z.object({
  email: z.string().email({ message: "Please write a valid email!" }),
  username: z.string(),
  password: z
    .string()
    .min(8, "Your password must contain at least 8 characters!")
    .refine(
      (v) => PASSWORD_REGEX.test(v),
      "Your password must contain at least one uppercase letter, one lowercase letter and one number, and shouldn't include any spaces."
    ),
});

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof registerSchema>;
