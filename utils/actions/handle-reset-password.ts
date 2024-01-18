"use server"

import * as z from "zod";
import { Resetchema } from "@/schemas"
import { getUserByEmail } from "../data/get-user";
import { defaultErrorMessage, defaultSuccessMessage } from "../constants/default-messages";
import { sendResetPasswordEmail } from "@/lib/send-mails";
import { generateResetPasswordToken } from "./generate-tokens";


export const handleResetPassword = async (values: z.infer<typeof Resetchema>) => {
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

      return { success: `${defaultSuccessMessage.emailSent}` };
};