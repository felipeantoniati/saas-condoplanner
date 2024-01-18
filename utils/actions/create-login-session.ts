"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateTwoFactorToken, generateVerificationToken } from "./generate-tokens";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/send-mails";
import { getTwoFactorTokenByEmail } from "../data/get-two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "../data/get-two-factor-confirmation";
import { defaultErrorMessage } from "../constants/default-messages";
import { getUserByEmail } from "../data/get-user";

export const handleLogin = async (values: z.infer<typeof LoginSchema>) => {
      const validateFields = LoginSchema.safeParse(values);

      if (!validateFields.success) {
            return { error: `${defaultErrorMessage.isInvalid}` }
      };

      const { email, password, code } = validateFields.data;

      const existingUser = await getUserByEmail(email);

      if (!existingUser || !existingUser.email || !existingUser.password) {
            return { error: `${defaultErrorMessage.isInvalid}` }
      };

      if (!existingUser.emailVerified) {
            const verificationToken = await generateVerificationToken(existingUser.email);

            await sendVerificationEmail(
                  verificationToken.email,
                  verificationToken.token
            );

            return { success: "Email de confirmação enviado" }
      };

      if (existingUser.isTwoFactorEnable && existingUser.email) {
            if (code) {
                  const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

                  if (!twoFactorToken) {
                        return { error: `${defaultErrorMessage.isInvalid}` }
                  }

                  if (twoFactorToken.token !== code) {
                        return { error: `${defaultErrorMessage.isInvalid}` }
                  }

                  const hasExpired = new Date(twoFactorToken.expires) < new Date();

                  if (hasExpired) {
                        return { error: `${defaultErrorMessage.expiredCode}` }
                  }

                  await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } })

                  const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

                  if (existingConfirmation) {
                        await db.twoFactorConfirmation.delete({ where: { id: existingConfirmation.id } });
                  };

                  await db.twoFactorConfirmation.create({
                        data: { userId: existingUser.id }
                  });

            } else {
                  const twoFactorToken = await generateTwoFactorToken(existingUser.email)
                  await sendTwoFactorTokenEmail(
                        twoFactorToken.email,
                        twoFactorToken.token
                  );

                  return { twoFactor: true }
            }
      };

      try {
            await signIn("credentials", {
                  email,
                  password,
                  redirectTo: DEFAULT_LOGIN_REDIRECT,
            });
      } catch (error) {
            if (error instanceof AuthError) {
                  switch (error.type) {
                        case "CredentialsSignin":
                              return { error: `${defaultErrorMessage.isInvalid}` };
                        default:
                              return { error: `${defaultErrorMessage.internalServerError}` };
                  };
            };

            throw error;
      };
};