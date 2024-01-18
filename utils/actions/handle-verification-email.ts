"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "../data/get-user";
import { getVerificationTokenByToken } from "@/utils/data/get-verification-token";
import { defaultErrorMessage, defaultSuccessMessage } from "../constants/default-messages";

export const newVerification = async (token: string) => {
      const existingToken = await getVerificationTokenByToken(token);

      if (!existingToken) {
            return { error: `${defaultErrorMessage.isInvalid}` };
      };

      const hasExpired = new Date(existingToken.expires) < new Date();

      if (hasExpired) {
            return { error: `${defaultErrorMessage.expiredToken}` };
      }

      const existinUser = await getUserByEmail(existingToken.email);

      if (!existinUser) {
            return { error: `${defaultErrorMessage.notExistEmail}` };
      }

      await db.user.update({
            where: { id: existinUser.id },
            data: {
                  emailVerified: new Date(),
                  email: existingToken.email,
            }
      });

      await db.verificationToken.delete({ where: { id: existingToken.id } });

      return { success: `${defaultSuccessMessage.verifiedEmail}` };
};