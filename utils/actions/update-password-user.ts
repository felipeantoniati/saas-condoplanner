"use server"

import * as z from "zod";
import bcryptjs from "bcryptjs";

import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";

import { defaultErrorMessage, defaultSuccessMessage } from "@/utils/constants/default-messages";
import { getPasswordToResetTokenByToken } from "@/utils/data/get-password-reset-token";
import { getUserByEmail } from "@/utils/data/get-user";

export const handleUpdateNewPassword = async (
      values: z.infer<typeof NewPasswordSchema>,
      token?: string | null
) => {
      if (!token) {
            return { error: `Token Inexistente` }
      };

      const validateFields = NewPasswordSchema.safeParse(values);

      if (!validateFields.success) {
            return { error: `${defaultErrorMessage.isInvalid}` }
      }

      const { password } = validateFields.data;

      const existingToken = await getPasswordToResetTokenByToken(token)

      if (!existingToken) {
            return { error: `${defaultErrorMessage.isInvalid}` }
      };

      const hasExpired = new Date(existingToken.expires) < new Date();

      if (hasExpired) {
            return { error: `${defaultErrorMessage.expiredToken}` };
      }

      const existinUser = await getUserByEmail(existingToken.email)

      if (!existinUser) {
            return { error: `${defaultErrorMessage.notExistEmail}` };
      }

      const hashedPassword = await bcryptjs.hash(password, 10);

      await db.user.update({
            where: { id: existinUser.id },
            data: { password: hashedPassword }
      })

      return { success: `${defaultSuccessMessage.updatedPassword}` }
}