import { db } from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
      try {
            const twoFactorAuthFound = await db.twoFactorConfirmation.findUnique({ where: { userId } });
            return twoFactorAuthFound
      } catch {
            return null;
      };
};