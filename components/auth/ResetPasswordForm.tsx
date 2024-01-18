"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

import { CardWrapper } from "@/components/auth/CardWrapperForm";
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Resetchema } from "@/schemas";
import { handleResetPassword } from "@/utils/actions/handle-reset-password";

export const ResetPasswordForm = () => {
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
                  handleResetPassword(values).then((data) => {
                        setError(data?.error);
                        setSuccess(data?.success);
                  });
            });
      };

      return (
            <CardWrapper
                  headerLabel="Esqueceu Sua senha ?"
                  backButtonLabel="Voltar ao Login"
                  backButtonHref="/auth/login"
            >
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
            </CardWrapper>
      );
};