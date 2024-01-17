"use server"

import * as z from "zod";
import bcryptjs from "bcryptjs";

import { NewPasswordSchema } from "@/schemas";
import { defaultErrorMessage } from "./default-messages";
import { getPasswordToResetTokenByToken } from "./password-reset-token";
import { getUserByEmail } from "./fetchData/user";
import { db } from "@/lib/db";

export const newPassword = async (
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
            return { error: `Token Expirado` };
      }

      const existinUser = await getUserByEmail(existingToken.email)

      if (!existinUser) {
            return { error: `Email não existe` };
      }

      const hashedPassword = await bcryptjs.hash(password, 10);

      await db.user.update({
            where: { id: existinUser.id },
            data: { password: hashedPassword }
      })

      return { success: "Senha Atualizada com sucesso" }
}