"use server";

import { getVerificationTokenByToken } from "@/utils/database-searches/get-verification-token";
import { getUserByEmail } from "@/utils/database-searches/get-user-data";
import { db } from "@/lib/db";
import defaultMessage from "@/utils/default-messages.json";

export const handleConfirmationEmailSends = async (token: string) => {
      const existingToken = await getVerificationTokenByToken(token)
      if (!existingToken) return { error: `${defaultMessage.invalidToken}` };

      const hasExpired = new Date(existingToken.expires) < new Date();
      if (hasExpired) return { error: `${defaultMessage.expiredToken}` };

      const existinUser = await getUserByEmail(existingToken.email);
      if (!existinUser) return { error: `${defaultMessage.nonExistingEmail}` };

      await db.user.update({
            where: { id: existinUser.id },
            data: {
                  emailVerified: new Date(),
                  email: existingToken.email,
            },
      });

      await db.verificationToken.delete({ where: { id: existingToken.id } });
      return { success: `${defaultMessage.confirmEmail}` };
};