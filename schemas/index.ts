import * as z from "zod";
import defaultErrorMessage from "@/utils/default-messages.json";

export const Resetchema = z.object({
      email: z.string().email({ message: `${defaultErrorMessage.invalidEmail}` }),
});

export const NewPasswordSchema = z.object({
      password: z.string().min(6, { message: `${defaultErrorMessage.passwordLength}` }),
});

export const LoginSchema = z.object({
      email: z.string().email({ message: `${defaultErrorMessage.invalidEmail}` }),
      password: z.string().min(1, { message: `${defaultErrorMessage.requiredField}` }),
      code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
      name: z.string().min(1, { message: `${defaultErrorMessage.requiredField}` }),
      email: z.string().email({ message: `${defaultErrorMessage.requiredField}` }),
      password: z.string().min(6, { message: `${defaultErrorMessage.passwordLength}` }),
});
