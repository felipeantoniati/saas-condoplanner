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

import { login } from "@/utils/login-action";
import { LoginSchema } from "@/schemas";

export const LoginForm = () => {
      const [errorMessage, seterrorMessage] = useState<string | undefined>("");
      const [successMessage, setsuccessMessage] = useState<string | undefined>("");
      const [isPeding, startTransition] = useTransition();

      const form = useForm<z.infer<typeof LoginSchema>>({
            resolver: zodResolver(LoginSchema),
            defaultValues: {
                  email: "",
                  password: ""
            }
      });

      const submitLoginFormData = (values: z.infer<typeof LoginSchema>) => {
            seterrorMessage("");
            setsuccessMessage("");

            startTransition(() => {
                  login(values).then((data) => {
                        seterrorMessage(data?.error);
                        setsuccessMessage(data?.success);
                  });
            });
      };

      return (
            <Form {...form}>
                  <form
                        className="space-y-6"
                        onSubmit={form.handleSubmit(submitLoginFormData)}
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
                              className="w-full"
                              variant={"login"}
                              disabled={isPeding}
                              size={"md"}
                              type="submit"
                        >
                              Entrar
                        </Button>
                  </form>
            </Form>
      );
};