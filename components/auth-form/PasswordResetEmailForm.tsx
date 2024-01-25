"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ErrorMessage";
import { SuccessMessage } from "@/components/SuccessMessage";

import { Resetchema } from "@/schemas";
import { handleSendingResetPasswordEmail } from "@/utils/database-operations/send-reset-password";
import defaultMessage from "@/utils/default-messages.json"
import { WrapperForm } from "./WrapperForm";
import { SyncLoader } from "react-spinners";
import Link from "next/link";

export const PasswordResetEmailForm = () => {
      const [error, setError] = useState<string | undefined>("");
      const [success, setSuccess] = useState<string | undefined>("");
      const [isPending, startTransition] = useTransition();

      const form = useForm<z.infer<typeof Resetchema>>({
            resolver: zodResolver(Resetchema),
            defaultValues: { email: "" }
      });

      const submitResetPasswordEmail = (values: z.infer<typeof Resetchema>) => {
            cleanMessages();

            startTransition(() => {
                  handleSendingResetPasswordEmail(values)
                        .then((data) => {
                              if (data.error) {
                                    setError(data.error);
                              };

                              if (data.success) {
                                    setSuccess(data?.success);
                              };

                        }).catch(() => {
                              setError(`${defaultMessage.internalServerError}`)
                        });
            });
      };

      const cleanMessages = () => {
            setError("");
            setSuccess("");
      };

      return (
            <WrapperForm headerLabel={
                  isPending
                        ? "Enviando e-mail de redefinição de senha..."
                        : !success && "Insira seu e-mail no formulário abaixo para receber um e-mail de redefinicição de senha."
            } >
                  <Form {...form}>
                        <form
                              className="space-y-6"
                              onSubmit={form.handleSubmit(submitResetPasswordEmail)}
                              onChange={cleanMessages}
                        >
                              <section className="space-y-4" >
                                    <FormField
                                          control={form.control}
                                          name="email"
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormLabel>
                                                            Email
                                                      </FormLabel>
                                                      <FormControl>
                                                            <Input
                                                                  {...field}
                                                                  disabled={isPending}
                                                                  placeholder="seuemail@example.com"
                                                                  type="email"
                                                            />
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />
                              </section>

                              {isPending ? (
                                    <div className="w-full p-3 flex justify-center ">
                                          <SyncLoader size={12} color="#1D4ED8" />
                                    </div>
                              ) : error ? (
                                    <ErrorMessage message={error} />
                              ) : !isPending && !success && (
                                    <Button
                                          className="w-full tracking-wider"
                                          variant={"default"}
                                          disabled={isPending}
                                          size={"md"}
                                          type="submit"
                                    >
                                          Enviar Email
                                    </Button>
                              )}

                              {!isPending && (
                                    <div className="pt-6 w-full flex flex-col items-center gap-5 justify-center">
                                          <SuccessMessage message={success} />
                                          <Link
                                                href={"/auth/login"}
                                                className="hover:underline text-slate-900"
                                          >
                                                Voltar ao Login
                                          </Link>
                                    </div>
                              )}
                        </form>
                  </Form >
            </WrapperForm >
      );
};