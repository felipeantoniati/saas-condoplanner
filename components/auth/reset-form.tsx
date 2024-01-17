"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Resetchema } from "@/schemas";
import { resetPassword } from "@/utils/reset-password-action";



export const ResetForm = () => {
      const [error, setError] = useState<string | undefined>("");
      const [success, setSuccess] = useState<string | undefined>("");
      const [isPeding, startTransition] = useTransition();

      const form = useForm<z.infer<typeof Resetchema>>({
            resolver: zodResolver(Resetchema),
            defaultValues: { email: "" }
      });

      const submitResetFormData = (values: z.infer<typeof Resetchema>) => {
            setError("");
            setSuccess("");

            startTransition(() => {
                  resetPassword(values).then((data) => {
                        setError(data?.error);
                        setSuccess(data?.success);
                  });
            });
      };

      return (
            <Form {...form}>
                  <form
                        className="space-y-6"
                        onSubmit={form.handleSubmit(submitResetFormData)}
                  >
                        <section className="space-y-4" >
                              <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                      <Input
                                                            {...field}
                                                            disabled={isPeding}
                                                            placeholder="seuemail@example.com"
                                                            type="email"
                                                      />
                                                </FormControl>
                                                <FormMessage />
                                          </FormItem>
                                    )}
                              />

                        </section>

                        <FormError message={error} />
                        <FormSuccess message={success} />

                        <Button
                              className="w-full"
                              variant={"default"}
                              disabled={isPeding}
                              size={"md"}
                              type="submit"
                        >
                              Enviar email de recuperação
                        </Button>
                  </form>
            </Form>
      );
};