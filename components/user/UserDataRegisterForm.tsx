"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { SyncLoader } from "react-spinners";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SuccessMessage } from "@/components/SuccessMessage";
import { Input } from "@/components/ui/input";
import { WrapperForm } from "@/components/auth-form/WrapperForm";
import { RegisterSchema } from "@/schemas";
import { handleCreatingUserData } from "@/utils/database-operations/create-user-data";
import defaultMessage from "@/utils/default-messages.json"

export const UserDataRegisterForm = () => {
      const [error, setError] = useState<string | undefined>("");
      const [success, setSuccess] = useState<string | undefined>("");
      const [isPending, startTransition] = useTransition();

      const form = useForm<z.infer<typeof RegisterSchema>>({
            resolver: zodResolver(RegisterSchema),
            defaultValues: {
                  name: "",
                  email: "",
                  password: "",
            }
      });

      const submitUserDataRegisterForm = (values: z.infer<typeof RegisterSchema>) => {
            cleanMessages();

            startTransition(() => {
                  handleCreatingUserData(values).then((data) => {
                        if (data?.error) {
                              form.reset();
                              setError(data?.error)
                        };

                        if (data?.success) {
                              form.resetField("password");
                              setSuccess(data?.success)
                        };
                  }).catch(() =>
                        setError(`${defaultMessage.internalServerError}`)
                  );
            });
      };

      const cleanMessages = () => {
            setError("");
            setSuccess("");
      };

      return (
            <WrapperForm headerLabel={
                  isPending
                        ? "Validando Cadastro..."
                        : !success && "Preencha o formulário abaixo para criar sua conta"
            }>
                  <Form {...form}>
                        <form
                              className="space-y-6"
                              onSubmit={form.handleSubmit(submitUserDataRegisterForm)}
                              onChange={cleanMessages}
                        >
                              <section className="space-y-4" >
                                    {!isPending && !success && (
                                          <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>
                                                                  Nome
                                                            </FormLabel>
                                                            <FormControl>
                                                                  <Input
                                                                        {...field}
                                                                        disabled={isPending}
                                                                        placeholder="ex: Jhon Doe"
                                                                  />
                                                            </FormControl>
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />
                                    )}

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
                                                                  placeholder="ex: jhon.doe@email.com"
                                                                  type="email"
                                                            />
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />

                                    {!isPending && !success && (
                                          <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>
                                                                  Senha
                                                            </FormLabel>
                                                            <FormControl>
                                                                  <Input
                                                                        {...field}
                                                                        disabled={isPending}
                                                                        placeholder="*******"
                                                                        type="password"
                                                                  />
                                                            </FormControl>
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />
                                    )}
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
                                          Cadastrar
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