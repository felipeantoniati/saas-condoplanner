"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import { useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

import { CardWrapper } from "@/components/auth/CardWrapperForm";
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { NewPasswordSchema } from "@/schemas";
import { handleUpdateNewPassword } from "@/utils/actions/update-password-user";

export const NewPasswordForm = () => {
      const [error, setError] = useState<string | undefined>("");
      const [success, setSuccess] = useState<string | undefined>("");
      const [isPeding, startTransition] = useTransition();

      const searchParams = useSearchParams();
      const token = searchParams.get("token");

      const form = useForm<z.infer<typeof NewPasswordSchema>>({
            resolver: zodResolver(NewPasswordSchema),
            defaultValues: { password: "" }
      });

      const submitResetFormData = (values: z.infer<typeof NewPasswordSchema>) => {
            setError("");
            setSuccess("");

            startTransition(() => {
                  handleUpdateNewPassword(values, token).then((data) => {
                        setError(data?.error);
                        setSuccess(data?.success);
                  });
            });
      };

      return (
            <CardWrapper
                  headerLabel="Escolha uma nova senha"
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
                                          name="password"
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormLabel>Nova Senha</FormLabel>
                                                      <FormControl>
                                                            <Input
                                                                  {...field}
                                                                  disabled={isPeding}
                                                                  placeholder="******"
                                                                  type="password"
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
                                    Salvar
                              </Button>
                        </form>
                  </Form>
            </CardWrapper>
      );
};