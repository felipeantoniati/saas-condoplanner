import * as z from "zod";
import { defaultErrorMessage } from "@/utils/constants/default-messages";

export const LoginSchema = z.object({
      email: z.string().email({ message: `${defaultErrorMessage.requiredField}` }),
      password: z.string().min(1, { message: `${defaultErrorMessage.requiredField}` }),
      code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
      name: z.string().min(1, { message: `${defaultErrorMessage.requiredField}` }),
      email: z.string().email({ message: `${defaultErrorMessage.requiredField}` }),
      password: z.string().min(6, { message: `${defaultErrorMessage.passwordLength}` }),
});

export const Resetchema = z.object({
      email: z.string().email({ message: `${defaultErrorMessage.requiredField}` }),
});

export const NewPasswordSchema = z.object({
      password: z.string().min(6, { message: `${defaultErrorMessage.passwordLength}` }),
});
