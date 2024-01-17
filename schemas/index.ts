import * as z from "zod";
import { defaultErrorMessage } from "@/utils/default-messages";

export const Resetchema = z.object({
      email: z.string().email({
            message: `${defaultErrorMessage.isRequired}`
      }),
});

export const NewPasswordSchema = z.object({
      password: z.string().min(6, {
            message: `${defaultErrorMessage.passwordLength}`
      }),
});

export const LoginSchema = z.object({
      email: z.string().email({
            message: `${defaultErrorMessage.isRequired}`
      }),
      password: z.string().min(1, {
            message: `${defaultErrorMessage.isRequired}`
      }),
});

export const RegisterSchema = z.object({
      name: z.string().min(1, {
            message: `${defaultErrorMessage.isRequired}`
      }),
      email: z.string().email({
            message: `${defaultErrorMessage.isRequired}`
      }),
      password: z.string().min(6, {
            message: `${defaultErrorMessage.passwordLength}`
      }),
});
