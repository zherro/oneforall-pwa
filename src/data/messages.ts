const MESSAGES = {
  FORM: {
    VALIDADION: {
      REQUIRED_FIELD: "Campo obrigatório",
      INVALID_EMAIL: "Email inválido",
      PASSWORD_MIN_LENGHT: "A senha deve ter ao menos 6 carateres",
      PASSWORD_MAX_LENGHT: "A senha deve ter no máximo 16 carateres",
      PASSWORD_SHOULD_EQUALS: "A senhas devem ser iguais",
      PASSWORD_CONFIRM_IS_REQUIRED: "Para continuar, digite a senha novamente",
      PUT_VERIFICARION_CODE: "Informe o código de verificação",
      PUT_LOGIN: "Informe seu login",
    },
  },

  // ERRORS
  ERROR_NOT_COMPLETE_REQUEST: "Algo deu errado! Não conseguimos completar a solicitação.",

  // USER MESSAGES
  INVALID_CREDENTIALS_TOKE:
    "A verificação expirou ou é invalida! Solicite uma nova recuperação de senha, para receber um novo token.",
};

export default MESSAGES;
