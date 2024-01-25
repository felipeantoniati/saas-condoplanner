import { db } from "@/lib/db";

export const getPasswordToResetTokenByToken = async (token: string) => {
      try {
            const passwordResetToken = await db.passWordResetToken.findUnique({ where: { token } })
            return passwordResetToken
      } catch {
            return null;
      };
};

export const getPasswordToResetTokenByEmail = async (email: string) => {
      try {
            const passwordResetToken = await db.passWordResetToken.findFirst({ where: { email } });
            return passwordResetToken
      } catch {
            return null;
      };
};