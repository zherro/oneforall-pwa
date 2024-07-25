"use client";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";

import useVisibility from "./useVisibility";

import Box from "@component/Box";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import CheckBox from "@component/CheckBox";
import TextField from "@component/text-field";
import { Button, IconButton } from "@component/buttons";
import { H3, H5, H6, SemiSpan } from "@component/Typography";
// STYLED COMPONENT
import { StyledRoot } from "./styles";
import MESSAGES from "@data/messages";

export default function Signup({ formAction }: { formAction: any }) {
  const { passwordVisibility, togglePasswordVisibility } = useVisibility();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    re_password: "",
    agreement: false,
  };

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email(MESSAGES.FORM.VALIDADION.INVALID_EMAIL)
      .required(MESSAGES.FORM.VALIDADION.REQUIRED_FIELD),
    password: yup
      .string()
      .min(6, MESSAGES.FORM.VALIDADION.PASSWORD_MIN_LENGHT)
      .max(16, MESSAGES.FORM.VALIDADION.PASSWORD_MAX_LENGHT)
      .required(MESSAGES.FORM.VALIDADION.REQUIRED_FIELD),
    re_password: yup
      .string()
      .oneOf(
        [yup.ref("password"), undefined],
        MESSAGES.FORM.VALIDADION.PASSWORD_SHOULD_EQUALS
      )
      .required(MESSAGES.FORM.VALIDADION.PASSWORD_CONFIRM_IS_REQUIRED),
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
        <H3 textAlign="center" mb="0.5rem">
          Crie sua conta
        </H3>

        <H5
          fontWeight="600"
          fontSize="12px"
          color="gray.800"
          textAlign="center"
          mb="2.25rem"
        >
          Crie seu login logo abaixo
        </H5>

        <TextField
          fullwidth
          mb="0.75rem"
          name="email"
          type="email"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          placeholder="meu_email@exemplo.com"
          label="Email"
          errorText={touched.email && errors.email}
        />

        <TextField
          fullwidth
          mb="0.75rem"
          id="password"
          name="password"
          label="Senha"
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
          variant="contained"
          color="primary"
          disabled={!isValid}
          formAction={formAction}
          fullwidth
        >
          Criar Conta
        </Button>
      </form>

      <FlexBox justifyContent="center" bg="gray.200" py="19px">
        <SemiSpan>Ja tem uma conta?</SemiSpan>
        <Link href="/login">
          <H6
            ml="0.5rem"
            borderBottom="1px solid"
            borderColor="primary.main"
            color="primary.main"
          >
            Login
          </H6>
        </Link>
      </FlexBox>
    </StyledRoot>
  );
}
