interface DefaultErrorMessagesProps {
      isRequired: string;
      isInvalid: string;
      passwordLength: string;
}

interface DefaultSuccessMessagesProps {
      emailSent: string;
}

export const defaultErrorMessage: DefaultErrorMessagesProps = {
      isRequired: "Este campo é obrigatório",
      isInvalid: "Dados inválidos ou inexistentes",
      passwordLength: "Insira no mínimo 6 caractéres para senha",
}

export const defaultSuccessMessage: DefaultSuccessMessagesProps = {
      emailSent: "Email enviado com Sucesso",
}