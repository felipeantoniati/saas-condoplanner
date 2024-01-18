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

import { RegisterSchema } from "@/schemas";
import { handleRegister } from "@/utils/actions/create-user-data";

export const RegisterUserForm = () => {
      const [errorMessage, seterrorMessage] = useState<string | undefined>("");
      const [successMessage, setsuccessMessage] = useState<string | undefined>("");
      const [isPeding, startTransition] = useTransition();

      const form = useForm<z.infer<typeof RegisterSchema>>({
            resolver: zodResolver(RegisterSchema),
            defaultValues: {
                  name: "",
                  email: "",
                  password: "",
            }
      });

      const submitRegisterFormData = (values: z.infer<typeof RegisterSchema>) => {
            seterrorMessage("");
            setsuccessMessage("");

            startTransition(() => {
                  handleRegister(values).then((data) => {
                        seterrorMessage(data.error);
                        setsuccessMessage(data.success);
                  });
            });
      };

      return (
            <CardWrapper
                  headerLabel="Crie sua conta"
                  backButtonLabel="Já possui uma conta ?"
                  backButtonHref="/auth/login"
            >
                  <Form {...form}>
                        <form
                              className="space-y-6"
                              onSubmit={form.handleSubmit(submitRegisterFormData)}
                        >
                              <section className="space-y-4" >
                                    <FormField
                                          control={form.control}
                                          name="name"
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormLabel>Nome</FormLabel>
                                                      <FormControl>
                                                            <Input
                                                                  {...field}
                                                                  disabled={isPeding}
                                                                  placeholder="Ex: João"
                                                            />
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />

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
                                                                  placeholder="Ex: joao@email.com"
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
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />
                              </section>

                              <FormError message={errorMessage} />
                              <FormSuccess message={successMessage} />

                              <Button
                                    className="w-full tracking-wider"
                                    variant={"default"}
                                    disabled={isPeding}
                                    size={"md"}
                                    type="submit"
                              >
                                    Cadastrar
                              </Button>
                        </form>
                  </Form>
            </CardWrapper>
      );
};