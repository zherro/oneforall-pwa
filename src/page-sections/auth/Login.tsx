"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";

import useVisibility from "./useVisibility";

import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import TextField from "@component/text-field";
import { Button, IconButton } from "@component/buttons";
import Typography, { H3, H6, SemiSpan } from "@component/Typography";
// STYLED COMPONENT
import { StyledRoot } from "./styles";
import Box from "@component/Box";
import { useLaraTheme } from "@context/app-context/AppContext";

export default function Login({ formAction }: { formAction: any }) {
  const theme = useLaraTheme();

  const router = useRouter();
  const query = useSearchParams();
  const { passwordVisibility, togglePasswordVisibility } = useVisibility();

  const initialValues = { email: "", password: "" };

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Informe um email válido")
      .required("Informe seu login"),
    password: yup.string().required("Digite sua senha de acesso"),
  });

  const handleFormSubmit = async (values: any) => {
    router.push("/profile");
    console.log(values);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });

  return (
    <StyledRoot mx="auto" my="4rem" boxShadow="large" borderRadius={8}>
      <form className="content">
        <H3 textAlign="center" mb="2.5rem">
          Seja bem vindo 🥳
        </H3>
        {query != null && query.get("retry") == "true" && (
          <Box>
            <Typography
              textAlign="center"
              backgroundColor={theme.colors.error.light}
              fontSize="0.95rem"
              p="0.75rem"
              mb="1rem"
            >
              Login ou senha incorretos
            </Typography>
          </Box>
        )}

        {/* <H5 fontWeight="600" fontSize="12px" color="gray.800" textAlign="center" mb="2.25rem">
          Faça seu login
        </H5> */}

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
          label="Seu email"
          errorText={touched.email && errors.email}
        />

        <TextField
          mb="1rem"
          fullwidth
          id="id"
          name="password"
          label="Senha"
          autoComplete="on"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="*********"
          value={values.password}
          errorText={touched.password && errors.password}
          type={passwordVisibility ? "text" : "password"}
          endAdornment={
            <IconButton
              p="0.25rem"
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
          formAction={formAction}
          fullwidth
        >
          Entrar
        </Button>
        {/* 
        <Box mb="1rem">
          <Divider width="200px" mx="auto" />
          <FlexBox justifyContent="center" mt="-14px">
            <Span color="text.muted" bg="body.paper" px="1rem">
              on
            </Span>
          </FlexBox>
        </Box>

        <FlexBox
          mb="0.75rem"
          height="40px"
          color="white"
          bg="#3B5998"
          borderRadius={5}
          cursor="pointer"
          alignItems="center"
          justifyContent="center">
          <Icon variant="small" defaultcolor="auto" mr="0.5rem">
            facebook-filled-white
          </Icon>

          <Small fontWeight="600">Continue with Facebook</Small>
        </FlexBox>

        <FlexBox
          mb="1.25rem"
          height="40px"
          color="white"
          bg="#4285F4"
          borderRadius={5}
          cursor="pointer"
          alignItems="center"
          justifyContent="center">
          <Icon variant="small" defaultcolor="auto" mr="0.5rem">
            google-1
          </Icon>

          <Small fontWeight="600">Continue with Google</Small>
        </FlexBox> */}

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

      <FlexBox justifyContent="center" bg="gray.200" py="19px">
        <SemiSpan>Esqueceu sua senha?</SemiSpan>
        <Link href={`/recovery?email=${values.email}`}>
          <H6
            ml="0.5rem"
            borderBottom="1px solid"
            borderColor="primary.main"
            color="primary.main"
          >
            Recuperar Senha
          </H6>
        </Link>
      </FlexBox>
    </StyledRoot>
  );
}
