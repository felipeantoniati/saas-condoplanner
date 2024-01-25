"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { BeatLoader } from "react-spinners";
import { WrapperForm } from "./WrapperForm";
import { ErrorMessage } from "../ErrorMessage";
import { SuccessMessage } from "../SuccessMessage";
import { handleConfirmationEmailSends } from "@/utils/database-operations/confirmation-email-sends";
import defaultMessage from "@/utils/default-messages.json";

export const AutoConfirmationEmailForm = () => {
      const [error, setError] = useState<string | undefined>();
      const [success, setSuccess] = useState<string | undefined>();
      const [isPending, startTransistion] = useTransition();

      const searchParams = useSearchParams();

      const token = searchParams.get("token");

      const handleSubmit = useCallback(() => {
            if (success || error) return;

            if (!token) {
                  setError(`${defaultMessage.invalidToken}`)
                  return;
            };

            startTransistion(() => {
                  handleConfirmationEmailSends(token)
                        .then((data) => {
                              if (data.error) {
                                    setError(data.error);
                              };

                              if (data.success) {
                                    setSuccess(data.success);
                              };

                        }).catch(() =>
                              setError(`${defaultMessage.internalServerError}`)
                        );
            });
      }, [token, success, error]);

      useEffect(() => {
            handleSubmit();
      }, [handleSubmit])

      return (
            <WrapperForm headerLabel={
                  isPending ? "Confirmando Cadastro de Conta..." : ""
            }>
                  <div className="flex flex-col items-center w-full justify-center">
                        {!error && !success && (
                              <BeatLoader color="#1D4ED8" />
                        )}

                        {!success && (
                              <ErrorMessage message={error} />
                        )}

                        <SuccessMessage message={success} />

                        <div className="w-full flex flex-col items-center pt-5 justify-center">
                              <Link
                                    href={"/auth/login"}
                                    className="hover:underline text-slate-900"
                              >
                                    Voltar ao Login
                              </Link>
                        </div>
                  </div>
            </WrapperForm>
      );
};