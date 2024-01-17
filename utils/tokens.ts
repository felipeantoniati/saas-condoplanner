import { v4 as uuuidv4 } from "uuid"
import { getVerificationTokenByEmail } from "./verification-token";
import { db } from "@/lib/db";
import { getPasswordToResetTokenByEmail } from "./password-reset-token";



export const generateResetPasswordToken = async (email: string) => {
      const token = uuuidv4();
      const expires = new Date(new Date().getTime() + 3600 * 1000)

      const existingToken = await getPasswordToResetTokenByEmail(email);

      if (existingToken) {
            await db.passWordResetToken.delete({
                  where: { id: existingToken.id, }
            });
      }

      const passWordResetToken = await db.passWordResetToken.create({
            data: {
                  email,
                  token,
                  expires,
            }
      });

      return passWordResetToken;
};

export const generateVerificationToken = async (email: string) => {
      const token = uuuidv4();
      const expires = new Date(new Date().getTime() + 3600 * 1000)

      const existingToken = await getVerificationTokenByEmail(email);

      if (existingToken) {
            await db.verificationToken.delete({
                  where: {
                        id: existingToken.id,
                  }
            })
      }

      const verificationToken = await db.verificationToken.create({
            data: {
                  email,
                  token,
                  expires,
            }
      });

      return verificationToken;
};