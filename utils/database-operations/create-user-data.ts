"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/utils/database-searches/get-user-data";
import { db } from "@/lib/db";
import { generateVerificationToken } from "./generate-tokens";
import { sendVerificationEmail } from "@/lib/mail";
import defaultMessage from "@/utils/default-messages.json";

export const handleCreatingUserData = async (values: z.infer<typeof RegisterSchema>) => {
      const validateFields = RegisterSchema.safeParse(values);

      if (!validateFields.success) return {
            error: `${defaultMessage.invalidFields}`
      };

      const { name, email, password } = validateFields.data;

      const existingUser = await getUserByEmail(email);

      if (existingUser) return {
            error: `${defaultMessage.existingEmail}`
      };

      await db.user.create({
            data: {
                  name,
                  email,
                  password,
            },
      });

      const verificationToken = await generateVerificationToken(email);

      const response = await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
      );

      if (response === null) return {
            error: `${defaultMessage.devPeriod}`
      };

      return {
            success: `${defaultMessage.verificationEmailSent}`
      };
};