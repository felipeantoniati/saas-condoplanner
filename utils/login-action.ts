"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { defaultErrorMessage } from "./default-messages";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "./fetchData/user";
import { generateTwoFactorToken, generateVerificationToken } from "./tokens";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
      const validateFields = LoginSchema.safeParse(values);

      if (!validateFields.success) {
            return {
                  error: `${defaultErrorMessage.isInvalid}`
            }
      }

      const { email, password } = validateFields.data;

      const existingUser = await getUserByEmail(email);

      if (!existingUser || !existingUser.email || !existingUser.password) {
            return { error: `${defaultErrorMessage.isInvalid}` }
      }

      if (!existingUser.emailVerified) {
            const verificationToken = await generateVerificationToken(existingUser.email);

            await sendVerificationEmail(
                  verificationToken.email,
                  verificationToken.token
            );

            return { success: "Email de confirmação enviado" }
      }

      if (existingUser.isTwoFactorEnable && existingUser.email) {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email)
            await sendTwoFactorTokenEmail(
                  twoFactorToken.email,
                  twoFactorToken.token
            );

            return { twoFactor: true }
      }

      try {
            await signIn("credentials", {
                  email,
                  password,
                  redirectTo: DEFAULT_LOGIN_REDIRECT,
            })
      } catch (error) {
            if (error instanceof AuthError) {
                  switch (error.type) {
                        case "CredentialsSignin":
                              return { error: `${defaultErrorMessage.isInvalid}` }
                        default:
                              return { error: `${defaultErrorMessage.internalServerError}` }
                  }
            }

            throw error;
      }
}