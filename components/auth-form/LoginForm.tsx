"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ErrorMessage";
import { SuccessMessage } from "@/components/SuccessMessage";

import { LoginSchema } from "@/schemas";
import { handleLoginSession } from "@/utils/database-operations/create-login-session";
import defaultMessage from "@/utils/default-messages.json";
import Link from "next/link";
import { WrapperForm } from "./WrapperForm";
import { SyncLoader } from "react-spinners";

export const LoginForm = () => {
      const [showTwoFactor, setShowTwoFactor] = useState(false);
      const [error, setError] = useState<string | undefined>("");
      const [success, setSuccess] = useState<string | undefined>("");
      const [isPending, startTransition] = useTransition();

      const form = useForm<z.infer<typeof LoginSchema>>({
            resolver: zodResolver(LoginSchema),
            defaultValues: {
                  email: "",
                  password: ""
            },
      });

      const submitLoginFormData = (values: z.infer<typeof LoginSchema>) => {
            cleanMessages();

            startTransition(() => {
                  handleLoginSession(values).then((data) => {
                        if (data?.error) {
                              form.reset();
                              setError(data?.error)
                        };

                        if (data?.twoFactor) {
                              setShowTwoFactor(true);
                        };

                  }).catch(() =>
                        setError(`${defaultMessage.internalServerError}`)
                  );
            });
      };

      const cleanMessages = () => {
            setError("");
            setSuccess("");
      }

      return (
            <WrapperForm headerLabel={
                  isPending && !showTwoFactor
                        ? "Validando Credenciais..."
                        : isPending && showTwoFactor
                              ? "Validando Código..."
                              : !isPending && showTwoFactor
                                    ? "Insira o código que foi enviado para o seu e-mail"
                                    : "Faça o login com seu e-mail e senha"
            }>
                  <Form {...form}>
                        <form
                              className="space-y-6"
                              onSubmit={form.handleSubmit(submitLoginFormData)}
                              onChange={cleanMessages}
                        >
                              {showTwoFactor && !error && (
                                    <FormField
                                          control={form.control}
                                          name="code"
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormLabel>
                                                            Código de autenticação
                                                      </FormLabel>
                                                      <FormControl>
                                                            <Input
                                                                  {...field}
                                                                  disabled={isPending}
                                                                  placeholder="123456"
                                                            />
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />

                              )}

                              <section className="space-y-4" >
                                    {!showTwoFactor && (<>
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
                                    </>)}
                              </section>
                              {
                                    isPending ? (
                                          <div className="w-full p-3 flex justify-center ">
                                                <SyncLoader size={12} color="#1D4ED8" />
                                          </div>
                                    ) : error ? (
                                          <ErrorMessage message={error} />
                                    ) : !isPending && !success && (
                                          <Button
                                                size={"md"}
                                                className="w-full"
                                                variant={"login"}
                                                disabled={isPending}
                                                type="submit"
                                          >
                                                {showTwoFactor ? "Confirmar" : "Entrar"}
                                          </Button>
                                    )
                              }

                              {
                                    !isPending && (
                                          <div className=" w-full flex flex-col items-center gap-5 justify-center">
                                                <SuccessMessage message={success} />
                                                <Button
                                                      size={"sm"}
                                                      variant={"link"}
                                                      asChild
                                                      className="px-0"
                                                >
                                                      <Link href={"/auth/reset"}>
                                                            Esqueceu a senha ?
                                                      </Link>
                                                </Button>
                                          </div>
                                    )
                              }
                        </form >
                  </Form >
            </WrapperForm >
      );
};