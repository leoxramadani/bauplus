
import { ColumnDef } from '@tanstack/react-table';

import * as z from "zod";
import useTranslation from "../hooks/useTranslation";
const PASSWORD_REGEX = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$"
); // 1 uppercase, 1 lowercase, 1 number, 1 special

export const userFormSchema = z.object({
  username: z.string().min(3, "Username should be at least 3 characters long."),
  email: z
    .string()
    .nonempty("Email is required.")
    .email("Please provide a valid email address"),
  password: z
    .string()
    .min(8, "The password should be at least 8 characters long.")
    .refine(
      (v) => !PASSWORD_REGEX.test(v),
      "Password should have at lease 1 capital letter, 1 small letter, 1 number and 1 special character and without spaces"
    ),
  firstName: z.string().nonempty("First name is required."),
  lastName: z.string().nonempty("Last name is required."),
  phoneNumber: z
    .string()
    .refine((v) => /^\d+$/.test(v), "This should only contain numbers")
    .or(z.literal("")),
  address: z.string(),
});

export type IUserForm = z.infer<typeof userFormSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z
      .string()
      .min(8, "The password should be at least 8 characters long.")
      .refine(
        (v) => !PASSWORD_REGEX.test(v),
        "Password should have at lease 1 capital letter, 1 small letter, 1 number and 1 special character and without spaces"
      ),
    confirmNewPassword: z.string(),
  })
  .superRefine(({ currentPassword, newPassword, confirmNewPassword }, ctx) => {
    if (confirmNewPassword !== newPassword) {
      ctx.addIssue({
        path: ["confirmNewPassword"],
        code: "custom",
        message: "Passwords do not match!",
      });
    }
    if (currentPassword === newPassword) {
      ctx.addIssue({
        path: ["newPassword"],
        code: "custom",
        message: "The new password must be different from the current one.",
      });
    }
  });

export type IChangePassword = z.infer<typeof changePasswordSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please provide a valid email address!"),
});

export type IForgotPassword = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "The passwords do not match!",
      });
    }
  });

export type IResetPassword = z.infer<typeof resetPasswordSchema>;

const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  userName: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
});

export type columns = z.infer<typeof userSchema>;

export const columns: ColumnDef<columns>[] = [
  {
    accessorKey: "firstName",
    header: "First name",
    // Header: ({ header }) => {
    //   const { t } = useTranslation();
    //   return <p>{t(header.column.columnDef.header)}</p>;
    // },
  },
  {
    accessorKey: "lastName",
    header: "Last name",
    // Header: ({ header }) => {
    //   const { t } = useTranslation();
    //   return <p>{t(header.column.columnDef.header)}</p>;
    // },
  },
  {
    accessorKey: "userName",
    header: "Username",
    // Header: ({ header }) => {
    //   const { t } = useTranslation();
    //   return <p>{t(header.column.columnDef.header)}</p>;
    // },
  },
  {
    accessorKey: "address",
    header: "Address",
    // Header: ({ header }) => {
    //   const { t } = useTranslation();
    //   return <p>{t(header.column.columnDef.header)}</p>;
    // },
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    // Header: ({ header }) => {
    //   const { t } = useTranslation();
    //   return <p>{t(header.column.columnDef.header)}</p>;
    // },
  },
  {
    accessorKey: "email",
    header: "Email",
    // Header: ({ header }) => {
    //   const { t } = useTranslation();
    //   return <p>{t(header.column.columnDef.header)}</p>;
    // },
  },
];
