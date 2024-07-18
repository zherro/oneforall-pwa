"use client";
import { useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";

import FlexBox from "@component/FlexBox";
import TextField from "@component/text-field";
import { Button, IconButton } from "@component/buttons";
import { H3, Span } from "@component/Typography";
// STYLED COMPONENT
import { StyledRoot } from "./styles";
import { HStack, PinInput, PinInputField } from "@chakra-ui/react";
import { isEmpty } from "@utils/helpers/String.utils";
import useVisibility from "./useVisibility";
import Icon from "@component/icon/Icon";

export default function ResetPassword({ formAction }: { formAction: any }) {
  const query = useSearchParams();
  const token = query.get("token");
  const hasToken = !isEmpty(token);

  const { passwordVisibility, togglePasswordVisibility } = useVisibility();

  const initialValues = {
    email: query.get("email") || "",
    code: query.get("code") || "",
    token,
    password: "",
    re_password: "",
  };

  const validatePass: any = hasToken
    ? {
        password: yup.string().required("Campo obrigatório"),
        re_password: yup
          .string()
          .oneOf([yup.ref("password"), undefined], "A senhas devem ser iguais")
          .required("Para continuar, digite a senha novamente"),
      }
    : {};

  const formSchema = yup.object().shape({
    ...validatePass,
    email: yup
      .string()
      .email("Informe um email válido")
      .required("Informe seu login"),
    code: yup.string().required("Informe o código de verificação"),
  });

  const handleFormSubmit = async (values: any) => {
    console.log(values);
  };

  const {
    isValid,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: formSchema,
  });

  return (
    <StyledRoot mx="auto" my="2rem" boxShadow="large" borderRadius={8}>
      <form className="content">
        <H3 textAlign="center" mb="2rem">
          Redefinir Senha
        </H3>

        <TextField
          fullwidth
          mt="2rem"
          mb="2.75rem"
          id="email"
          name="email"
          type="email"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          placeholder="meuemail@...com"
          label="Email"
          errorText={touched.email && errors.email}
        />

        <Span display={hasToken ? "none" : "block"} fontSize="0.85rem">
          Código de verificação
        </Span>
        <FlexBox
          justifyContent="center"
          mt="0.5rem"
          display={hasToken ? "none" : "block"}
        >
          <HStack>
            <PinInput type="alphanumeric" size="lg" defaultValue={values.code}>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
        </FlexBox>

        <input type="hidden" id="code" name="code" value={values.code} />

        <TextField
          display={hasToken ? "block" : "none"}
          fullwidth
          mb="1rem"
          name="password"
          label="Nova Senha"
          placeholder="*********"
          onBlur={handleBlur}
          value={values.password}
          onChange={handleChange}
          errorText={touched.password && errors.password}
          type={passwordVisibility ? "text" : "password"}
          endAdornment={
            <IconButton
              p="0.25rem"
              mr="0.25rem"
              type="button"
              color={passwordVisibility ? "gray.700" : "gray.600"}
              onClick={togglePasswordVisibility}
            >
              <Icon variant="small" defaultcolor="currentColor">
                {passwordVisibility ? "eye-alt" : "eye"}
              </Icon>
            </IconButton>
          }
        />
        <TextField
          display={hasToken ? "block" : "none"}
          mb="1rem"
          fullwidth
          name="re_password"
          placeholder="*********"
          label="Confirmar Senha"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.re_password}
          type={passwordVisibility ? "text" : "password"}
          errorText={touched.re_password && errors.re_password}
          endAdornment={
            <IconButton
              p="0.25rem"
              size="small"
              mr="0.25rem"
              type="button"
              onClick={togglePasswordVisibility}
              color={passwordVisibility ? "gray.700" : "gray.600"}
            >
              <Icon variant="small" defaultcolor="currentColor">
                {passwordVisibility ? "eye-alt" : "eye"}
              </Icon>
            </IconButton>
          }
        />

        <Button
          mb="1.65rem"
          mt="2rem"
          variant="contained"
          color="primary"
          disabled={!isValid}
          formAction={formAction}
          fullwidth
        >
          {hasToken ? "Alterar Senha" : "Validar Código"}
        </Button>
      </form>
    </StyledRoot>
  );
}
