interface DefaultErrorMessagesProps {
      isRequired: string;
      isInvalid: string;
      passwordLength: string;
      existEmail: string;
      dataNotFound: string;
      requiredField: string;
      methodNotAllowed: string;
      internalServerError: string;
}

interface DefaultSuccessMessagesProps {
      emailSent: string;
      userCreated: string;
}

export const defaultErrorMessage: DefaultErrorMessagesProps = {
      isRequired: "Este campo é obrigatório",
      isInvalid: "Dados inválidos ou inexistentes",
      passwordLength: "Insira no mínimo 6 caractéres para senha",
      existEmail: "Este Email já esta em uso",
      dataNotFound: "Nenhum dado foi encontrado",
      requiredField: "Este campo é obrigatório",
      methodNotAllowed: "Método não permitido",
      internalServerError: "Ocorreu um erro ao processar a solicitação",
}

export const defaultSuccessMessage: DefaultSuccessMessagesProps = {
      emailSent: "Email enviado com Sucesso",
      userCreated: "Usuário criado com sucesso",
}