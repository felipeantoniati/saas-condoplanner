"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/utils/fetchData/user";
import { getVerificationTokenByToken } from "@/utils/verification-token";
import { defaultErrorMessage } from "./default-messages";

export const newVerification = async (token: string) => {
      const existingToken = await getVerificationTokenByToken(token)

      if (!existingToken) {
            return { error: `${defaultErrorMessage.isInvalid}` };
      };

      const hasExpired = new Date(existingToken.expires) < new Date();

      if (hasExpired) {
            return { error: `Token Expirado` };
      }

      const existinUser = await getUserByEmail(existingToken.email)
      console.log(existinUser);

      if (!existinUser) {
            return { error: `Email não existe` };
      }

      await db.user.update({
            where: { id: existinUser.id },
            data: {
                  emailVerified: new Date(),
                  email: existingToken.email,
            }
      });

      await db.verificationToken.delete({
            where: { id: existingToken.id }
      });

      return { success: "Email verificado!" }
}