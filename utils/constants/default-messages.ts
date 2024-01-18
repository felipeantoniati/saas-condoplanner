interface DefaultErrorMessagesProps {
      isInvalid: string;
      passwordLength: string;
      existEmail: string;
      dataNotFound: string;
      requiredField: string;
      methodNotAllowed: string;
      internalServerError: string;
      notExistEmail: string;
      expiredToken: string;
      expiredCode: string;
}

interface DefaultSuccessMessagesProps {
      emailSent: string;
      userCreated: string;
      updatedPassword: string;
      verifiedEmail: string;
      emailConfirmSent: string;
}

export const defaultErrorMessage: DefaultErrorMessagesProps = {
      isInvalid: "Dados inválidos ou inexistentes",
      dataNotFound: "Nenhum dado foi encontrado",
      methodNotAllowed: "Método não permitido",
      internalServerError: "Ocorreu um erro ao processar a solicitação",
      expiredToken: "Este token esta expirado",
      expiredCode: "Este código esta expirado",
      requiredField: "Este campo é obrigatório",
      existEmail: "Este Email já esta em uso",
      notExistEmail: "Este Email não existe",
      passwordLength: "Insira no mínimo 6 caractéres para senha",
}

export const defaultSuccessMessage: DefaultSuccessMessagesProps = {
      emailSent: "Email enviado com Sucesso",
      emailConfirmSent: "Um Email de confirmação foi enviado para você. Verifique em seus emails.",
      updatedPassword: "Senha atualizada com Sucesso",
      userCreated: "Usuário criado com sucesso",
      verifiedEmail: "Email verificado com Sucesso",
}