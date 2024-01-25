"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "../database-searches/get-user-data";
import { generateTwoFactorToken, generateVerificationToken } from "./generate-tokens";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "../database-searches/get-two-factor-token";
import { getTwoFactorConfirmationByUserId } from "../database-searches/get-two-factor-confirmation";
import { db } from "@/lib/db";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import defaulMessage from "@/utils/default-messages.json";

export const handleLoginSession = async (values: z.infer<typeof LoginSchema>) => {
      const validateFields = LoginSchema.safeParse(values);
      if (!validateFields.success) return { error: `${defaulMessage.invalidFields}` };

      const { email, password, code } = validateFields.data;

      const existingUser = await getUserByEmail(email);
      if (!existingUser || !existingUser.email || !existingUser.password) return { error: `${defaulMessage.nonExistingEmail}` };

      if (!existingUser.emailVerified) {
            const verificationToken = await generateVerificationToken(existingUser.email);

            const response = await sendVerificationEmail(
                  verificationToken.email,
                  verificationToken.token
            );

            if (response === null) {
                  return { error: `${defaulMessage.devPeriod}` };
            }

            return { error: `${defaulMessage.verifyConfirmationEmail}` };

      };

      if (existingUser.isTwoFactorEnable && existingUser.email) {

            if (code) {
                  const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
                  if (!twoFactorToken) return { error: `${defaulMessage.invalidToken}` };

                  if (twoFactorToken.token !== code) return { error: `${defaulMessage.invalidCode}` };

                  const hasExpired = new Date(twoFactorToken.expires) < new Date();
                  if (hasExpired) return { error: `${defaulMessage.expiredCode}` };

                  await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } });

                  const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

                  if (existingConfirmation) {
                        await db.twoFactorConfirmation.delete({
                              where: { id: existingConfirmation.id }
                        });
                  };

                  await db.twoFactorConfirmation.create({
                        data: { userId: existingUser.id }
                  });

            } else {
                  if (existingUser.password !== password) return { error: `${defaulMessage.invalidCredentials}` };

                  const twoFactorToken = await generateTwoFactorToken(existingUser.email);

                  await sendTwoFactorTokenEmail(
                        twoFactorToken.email,
                        twoFactorToken.token
                  );

                  return { twoFactor: true };
            };
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
                              return { error: `${defaulMessage.invalidCredentials}` };
                        default:
                              return { error: `${defaulMessage.internalServerError}` };
                  };
            };
            throw error;
      };
};