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

import { NewPasswordSchema } from "@/schemas";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/utils/new-password-action";

export const NewPasswordForm = () => {
      const searchParams = useSearchParams();
      const token = searchParams.get("token");

      const [error, setError] = useState<string | undefined>("");
      const [success, setSuccess] = useState<string | undefined>("");
      const [isPeding, startTransition] = useTransition();

      const form = useForm<z.infer<typeof NewPasswordSchema>>({
            resolver: zodResolver(NewPasswordSchema),
            defaultValues: { password: "" }
      });

      const submitResetFormData = (values: z.infer<typeof NewPasswordSchema>) => {
            setError("");
            setSuccess("");

            startTransition(() => {
                  newPassword(values, token).then((data) => {
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
      );
};