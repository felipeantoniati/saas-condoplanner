"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import Link from "next/link";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

import { CardWrapper } from "@/components/auth/CardWrapperForm";
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { LoginSchema } from "@/schemas";
import { handleLogin } from "@/utils/actions/create-login-session";
import { defaultErrorMessage } from "@/utils/constants/default-messages";

export const LoginForm = () => {
      const [showTwoFactor, setShowTwoFactor] = useState(false);
      const [errorMessage, setError] = useState<string | undefined>("");
      const [successMessage, setsuccessMessage] = useState<string | undefined>("");
      const [isPeding, startTransition] = useTransition();

      const form = useForm<z.infer<typeof LoginSchema>>({
            resolver: zodResolver(LoginSchema),
            defaultValues: { email: "", password: "" }
      });

      const submitLoginFormData = (values: z.infer<typeof LoginSchema>) => {
            setError("");
            setsuccessMessage("");

            startTransition(() => {
                  handleLogin(values).then((data) => {

                        if (data?.error) {
                              form.reset();
                              setError(data?.error)
                        };

                        if (data?.success) {
                              form.reset();
                              setError(data?.success)
                        };

                        if (data?.twoFactor) {
                              setShowTwoFactor(true);
                        };

                  }).catch(() =>
                        setError(`${defaultErrorMessage.internalServerError}`)
                  );
            });
      };

      return (
            <CardWrapper
                  headerLabel="Bem vindo de volta"
                  backButtonLabel="Não tem um conta?"
                  backButtonHref="/auth/register-user"
            >
                  <Form {...form}>
                        <form
                              className="space-y-6"
                              onSubmit={form.handleSubmit(submitLoginFormData)}
                        >
                              {showTwoFactor && (
                                    <FormField
                                          control={form.control}
                                          name="code"
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormLabel>Código de autenticação</FormLabel>
                                                      <FormControl>
                                                            <Input
                                                                  {...field}
                                                                  disabled={isPeding}
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
                                          <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>Senha</FormLabel>
                                                            <FormControl>
                                                                  <Input
                                                                        {...field}
                                                                        disabled={isPeding}
                                                                        placeholder="*******"
                                                                        type="password"
                                                                  />
                                                            </FormControl>
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
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />
                                    </>)}
                              </section>

                              <FormError message={errorMessage} />
                              <FormSuccess message={successMessage} />

                              <Button
                                    className="w-full"
                                    variant={"login"}
                                    disabled={isPeding}
                                    size={"md"}
                                    type="submit"
                              >
                                    {showTwoFactor ? "Confirmar" : "Entrar"}
                              </Button>
                        </form>
                  </Form>
            </CardWrapper >
      );
};