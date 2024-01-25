"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ErrorMessage";
import { SuccessMessage } from "@/components/SuccessMessage";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { NewPasswordSchema } from "@/schemas";
import { useSearchParams } from "next/navigation";
import { handleUpdatingNewPassword } from "@/utils/database-operations/update-new-password";
import { WrapperForm } from "./WrapperForm";
import { SyncLoader } from "react-spinners";
import Link from "next/link";

export const NewPasswordForm = () => {
      const searchParams = useSearchParams();
      const token = searchParams.get("token");

      const [error, setError] = useState<string | undefined>("");
      const [success, setSuccess] = useState<string | undefined>("");
      const [isPending, startTransition] = useTransition();

      const form = useForm<z.infer<typeof NewPasswordSchema>>({
            resolver: zodResolver(NewPasswordSchema),
            defaultValues: { password: "" }
      });

      const submitResetFormData = (values: z.infer<typeof NewPasswordSchema>) => {
            cleanMessages();

            startTransition(() => {
                  handleUpdatingNewPassword(values, token).then((data) => {
                        setError(data?.error);
                        setSuccess(data?.success);
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
                        ? "Atualizando Senha..."
                        : !success && "Escolha uma Nova Senha"
            } >
                  <Form {...form}>
                        <form
                              className="space-y-6"
                              onSubmit={form.handleSubmit(submitResetFormData)}
                              onChange={cleanMessages}
                        >
                              {!success && (
                                    <FormField
                                          control={form.control}
                                          name="password"
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormLabel>Nova Senha</FormLabel>
                                                      <FormControl>
                                                            <Input
                                                                  {...field}
                                                                  disabled={isPending}
                                                                  placeholder="******"
                                                                  type="password"
                                                            />
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />
                              )}

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
                                          Atualizar Senha
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
                  </Form>
            </WrapperForm>
      );
};