"use server"

import * as z from "zod";
import { Resetchema } from "@/schemas"
import { getUserByEmail } from "../database-searches/get-user-data"
import { generateResetPasswordToken } from "./generate-tokens";
import { sendResetPasswordEmail } from "@/lib/mail";
import defaultMessage from "@/utils/default-messages.json";

export const handleSendingResetPasswordEmail = async (values: z.infer<typeof Resetchema>) => {
      const validateFields = Resetchema.safeParse(values)

      if (!validateFields.success) return {
            error: `${defaultMessage.invalidFields}`
      };

      const { email } = validateFields.data;

      const existingUser = await getUserByEmail(email);

      if (!existingUser) return {
            error: `${defaultMessage.nonExistingEmail}`
      };

      const passwordResetToken = await generateResetPasswordToken(email);

      const response = await sendResetPasswordEmail(
            passwordResetToken.email,
            passwordResetToken.token
      );

      if (response === null) return {
            error: `${defaultMessage.devPeriod}`
      };

      return { success: `${defaultMessage.resetEmail}` }
}