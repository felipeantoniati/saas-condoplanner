import { db } from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
      try {
            const twoFactirConfirmation = await db.twoFactorConfirmation.findUnique({ where: { userId } })
            return twoFactirConfirmation
      } catch {
            return null;
      };
};