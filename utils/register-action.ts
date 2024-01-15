"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { defaultErrorMessage, defaultSuccessMessage } from "@/utils/default-messages";
import { getUserByEmail } from "@/utils/fetchData/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
      const validateFields = RegisterSchema.safeParse(values);

      if (!validateFields.success) {
            return {
                  error: `${defaultErrorMessage.isInvalid}`
            };
      };

      const { name, email, password } = validateFields.data;
      const hashedPassword = await bcrypt.hash(password, 10);

      const existingUser = await getUserByEmail(email);

      if (existingUser) {
            return {
                  error: `${defaultErrorMessage.existEmail}`
            };
      }

      await db.user.create({
            data: {
                  name,
                  email,
                  password: hashedPassword,
            },
      });

      return ({
            success: `${defaultSuccessMessage.userCreated}`
      });
};
