"use server"

import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { getPasswordToResetTokenByToken } from "../database-searches/get-password-reset-token";
import { getUserByEmail } from "../database-searches/get-user-data";
import { db } from "@/lib/db";
import defaultMessage from "@/utils/default-messages.json";

export const handleUpdatingNewPassword = async (
      values: z.infer<typeof NewPasswordSchema>,
      token?: string | null
) => {
      if (!token) return { error: `${defaultMessage.invalidToken}` };

      const validateFields = NewPasswordSchema.safeParse(values);
      if (!validateFields.success) return { error: `${defaultMessage.invalidFields}` };

      const { password } = validateFields.data;

      const existingToken = await getPasswordToResetTokenByToken(token);
      if (!existingToken) return { error: `${defaultMessage.invalidToken}` };

      const hasExpired = new Date(existingToken.expires) < new Date();
      if (hasExpired) return { error: `${defaultMessage.expiredToken}` };

      const existinUser = await getUserByEmail(existingToken.email);
      if (!existinUser) return { error: `${defaultMessage.nonExistingEmail}` };

      await db.user.update({
            where: { id: existinUser.id },
            data: { password }
      });

      return { success: `${defaultMessage.updatePasswordSuccessfully}` };
};