"use client";

import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/utils/new-verification-action";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

export const NewVerificationForm = () => {
      const [error, setError] = useState<string | undefined>();
      const [success, setSuccess] = useState<string | undefined>();

      const searchParams = useSearchParams();

      const token = searchParams.get("token");

      const handleSubmit = useCallback(() => {
            if (success || error) return;

            if (!token) {
                  setError("Token inexistente")
                  return;
            };

            newVerification(token)
                  .then((data) => {
                        setError(data.error);
                        setSuccess(data.success);
                  }).catch(() => {
                        setError("Algo de errado não esta certo")
                  })
      }, [token, success, error]);

      useEffect(() => {
            handleSubmit();
      }, [handleSubmit])

      return (
            <main className="h-full flex flex-col items-center justify-center gap-5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800">
                  <CardWrapper
                        headerLabel="Confirme sua verificação"
                        backButtonLabel="Voltar para o Login"
                        backButtonHref="/auth/login"
                  >
                        <div className="flex items-center w-full justify-center">
                              {!error && !success && (<BeatLoader />)}
                              <FormSuccess message={success} />
                              {!success && (<FormError message={error} />)}
                        </div>
                  </CardWrapper>
            </main>
      );
};