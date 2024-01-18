"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { defaultErrorMessage, defaultSuccessMessage } from "../constants/default-messages";
import { getUserByEmail } from "../data/get-user";
import { generateVerificationToken } from "./generate-tokens";
import { sendVerificationEmail } from "@/lib/send-mails";

export const handleRegister = async (values: z.infer<typeof RegisterSchema>) => {
      const validateFields = RegisterSchema.safeParse(values);

      if (!validateFields.success) {
            return { error: `${defaultErrorMessage.isInvalid}` };
      };

      const { name, email, password } = validateFields.data;
      
      const hashedPassword = await bcrypt.hash(password, 10);

      const existingUser = await getUserByEmail(email);

      if (existingUser) {
            return { error: `${defaultErrorMessage.existEmail}` };
      };

      await db.user.create({
            data: {
                  name,
                  email,
                  password: hashedPassword,
            },
      });

      const verificationToken = await generateVerificationToken(email);

      await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
      );

      return ({ success: `${defaultSuccessMessage.emailConfirmSent}` });
};
