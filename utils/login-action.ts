"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { defaultErrorMessage, defaultSuccessMessage } from "./default-messages";

export const login = async (values: z.infer<typeof LoginSchema>) => {
      const validateFields = LoginSchema.safeParse(values);

      if (!validateFields.success) {
            return {
                  error: `${defaultErrorMessage.isInvalid}`
            }
      }

      return ({
            success: `${defaultSuccessMessage.emailSent}`
      })
}