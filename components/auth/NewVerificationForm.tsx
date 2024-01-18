"use client";

import { useSearchParams } from "next/navigation";

import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";

import { CardWrapper } from "@/components/auth/CardWrapperForm";
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";

import { defaultErrorMessage } from "@/utils/constants/default-messages";
import { newVerification } from "@/utils/actions/handle-verification-email";

export const NewVerificationForm = () => {
      const [error, setError] = useState<string | undefined>();
      const [success, setSuccess] = useState<string | undefined>();

      const searchParams = useSearchParams();
      const token = searchParams.get("token");

      const handleSubmit = useCallback(() => {
            if (success || error) return;

            if (!token) {
                  setError(`${defaultErrorMessage.isInvalid}`)
                  return;
            };

            newVerification(token)
                  .then((data) => {
                        setError(data.error);
                        setSuccess(data.success);
                  }).catch(() => {
                        setError(`${defaultErrorMessage.internalServerError}`)
                  })
      }, [token, success, error]);

      useEffect(() => {
            handleSubmit();
      }, [handleSubmit]);

      return (
            <CardWrapper
                  headerLabel="Confirmando sua verificação"
                  backButtonLabel="Voltar para o Login"
                  backButtonHref="/auth/login"
            >
                  <div className="flex items-center w-full justify-center">
                        {!error && !success && (<BeatLoader />)}
                        {!success && (<FormError message={error} />)}
                        <FormSuccess message={success} />
                  </div>
            </CardWrapper>
      );
};