import crypto from "crypto";
import { v4 as uuuidv4 } from "uuid"
import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "../database-searches/get-verification-token";
import { getTwoFactorTokenByEmail } from "../database-searches/get-two-factor-token";
import { getPasswordToResetTokenByEmail } from "../database-searches/get-password-reset-token";

export const generateTwoFactorToken = async (email: string) => {
      const token = crypto.randomInt(100_000, 1_000_000).toString();
      const expires = new Date(new Date().getTime() + 3600 * 1000);

      const existingToken = await getTwoFactorTokenByEmail(email);

      if (existingToken) await db.twoFactorToken.delete({ where: { id: existingToken.id } });

      const twoFactorToken = await db.twoFactorToken.create({
            data: { email, token, expires, }
      });

      return twoFactorToken;
};

export const generateResetPasswordToken = async (email: string) => {
      const token = uuuidv4();
      const expires = new Date(new Date().getTime() + 3600 * 1000)

      const existingToken = await getPasswordToResetTokenByEmail(email);

      if (existingToken) await db.passWordResetToken.delete({ where: { id: existingToken.id, } });

      const passWordResetToken = await db.passWordResetToken.create({
            data: { email, token, expires, }
      });

      return passWordResetToken;
};

export const generateVerificationToken = async (email: string) => {
      const token = uuuidv4();
      const expires = new Date(new Date().getTime() + 3600 * 1000)

      const existingToken = await getVerificationTokenByEmail(email);

      if (existingToken) await db.verificationToken.delete({ where: { id: existingToken.id, } })

      const verificationToken = await db.verificationToken.create({
            data: { email, token, expires, }
      });

      return verificationToken;
};