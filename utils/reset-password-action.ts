"use server"

import * as z from "zod";
import { Resetchema } from "@/schemas"
import { getUserByEmail } from "./fetchData/user"
import { defaultErrorMessage } from "./default-messages";
import { sendResetPasswordEmail } from "@/lib/mail";
import { generateResetPasswordToken } from "./tokens";


export const resetPassword = async (values: z.infer<typeof Resetchema>) => {
      const validateFields = Resetchema.safeParse(values)

      if (!validateFields.success) {
            return ({ error: `${defaultErrorMessage.isInvalid}` });
      };

      const { email } = validateFields.data;

      const existingUser = await getUserByEmail(email);

      if (!existingUser) {
            return ({ error: `${defaultErrorMessage.isInvalid}` });
      };

      const passwordResetToken = await generateResetPasswordToken(email);

      await sendResetPasswordEmail(
            passwordResetToken.email,
            passwordResetToken.token
      );

      return { success: "Email enviado com sucesso" }
}