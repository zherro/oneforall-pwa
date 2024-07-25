"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";

import FlexBox from "@component/FlexBox";
import TextField from "@component/text-field";
import { Button } from "@component/buttons";
import { H3, H6, SemiSpan } from "@component/Typography";
// STYLED COMPONENT
import { StyledRoot } from "./styles";

export default function Recovery({ formAction }: { formAction: any }) {
  const query = useSearchParams();

  const initialValues = { email: query.get("email") || "" };

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Informe um email válido")
      .required("Informe seu login"),
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
          Recuperar senha
        </H3>

        <TextField
          fullwidth
          mb="0.75rem"
          id="email"
          name="email"
          type="email"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          placeholder="meu_email@exemplo.com"
          label="Informe seu email"
          errorText={touched.email && errors.email}
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
          Enviar Pedido
        </Button>

        <FlexBox justifyContent="center" mb="1.25rem">
          <SemiSpan>Ainda não tem uma conta?</SemiSpan>
          <Link href="/signup">
            <H6
              ml="0.5rem"
              borderBottom="1px solid"
              borderColor="primary.main"
              color="primary.main"
            >
              Criar Conta
            </H6>
          </Link>
        </FlexBox>
      </form>
    </StyledRoot>
  );
}
