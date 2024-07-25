"use client";
import Box from "@component/Box";
import Divider from "@component/Divider";
import Grid from "@component/grid/Grid";
import Select from "@component/Select";
import TextField from "@component/text-field";
import TextArea from "@component/textarea";
import { H1, H3, SemiSpan } from "@component/Typography";
import { useFormik } from "formik";
import Link from "next/link";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import { useState } from "react";
import APP_ROUTES, { API_ROUTES } from "@routes/app.routes";
import { fetchPost } from "@hook/useFetch2";
import useNotify from "@hook/useNotify";
import { useRouter } from "next/navigation";
import StringUtils from "@utils/helpers/String.utils";

const initialValues = {
  type: "",
  name: "",
  email: "",
  instagram: "",
  phone: "",
  message: "",
  recaptcha: "",
};

const ContatoPage = () => {
  const router = useRouter();
  const notify = useNotify();

  const [loading, onLoading] = useState<boolean>(false);

  const formSchema = yup.object().shape({
    type: yup.string().required("Selecione o motivo do contato"),
    name: yup.string().required("Informe seu nome"),
    email: yup
      .string()
      .email("Informe um email válido")
      .required("Informe um email válido"),
    phone: yup.string().required("Informe um telefone para contato"),
    message: yup
      .string()
      .min(50, "Escreva ao menos 50 caracteres")
      .max(500, "Máximo de 500 caracteres")
      .required("Nos conte o que motivou seu contato"),
    recaptcha:
      process.env.NODE_ENV == "development"
        ? yup.string().optional()
        : yup.string().required("Por favor, confirme que você não é um robô"),
  });

  const handleFormSubmit = (values: any) => {
    fetchPost(API_ROUTES.TICKETS, values, {
      notify: true,
      headers: {},
      handleData: () => router.push(APP_ROUTES.CONTACT_RECEIVED),
      handleError: (error) => {
        notify({
          status: "error",
          description: error.message,
        });
        onLoading(false);
      },
      onLoading,
    });
  };

  const {
    values,
    errors,
    touched,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: formSchema,
  });

  return (
    <>
      <Grid container containerCenter spacing={8}>
        <Grid item xs={12}>
          <H1 style={{ textTransform: "uppercase" }}>Fale Conosco</H1>
        </Grid>
        <Grid item xs={12}>
          <Box pb="0.75rem">
            <SemiSpan fontSize="1.15rem">Email: </SemiSpan>
            <SemiSpan color="gray.900" fontSize="1.15rem">
              {process.env.APP_EMAIL_SUPORT}
            </SemiSpan>
          </Box>
          <Box pb="0.75rem">
            <SemiSpan fontSize="1.15rem">Instagram: </SemiSpan>
            <Link
              style={{ fontSize: "1.15rem" }}
              prefetch={false}
              color="gray.900"
              href={process.env.APP_INSTAGRAN_LINK || ""}
            >
              {process.env.APP_INSTAGRAN_NAME || ""}
            </Link>
          </Box>
          <Box>
            <SemiSpan fontSize="1.15rem">Horário de atendimento: </SemiSpan>
            <SemiSpan color="gray.900" fontSize="1.15rem">
              09:00 as 18:00
            </SemiSpan>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Divider width="100%" bg="gray.400" />
        </Grid>
        <Grid item xs={12}>
          <H3 fontSize="1.5rem">Envie uma mensagem</H3>
          <SemiSpan fontSize="0.95rem">Respondemos rapidinho</SemiSpan>
        </Grid>
      </Grid>
      <Grid container containerCenter spacing={8} vertical_spacing={6}>
        <Grid item sm={12} md={6}>
          <Select
            mb="0.75rem"
            id="type"
            name="type"
            label="Qual o motivo do seu contato?"
            options={[
              {
                label: "Quero promover/anunciar meu evento/negócio",
                value: "promote_bussiess",
              },
              { label: "Parcerias", value: "partnerships" },
              { label: "Registrar reclamação", value: "protest" },
              { label: "Duvidas", value: "questions" },
              { label: "Sugestões", value: "sugestion" },
              { label: "Pedido de informação", value: "require_information" },
              { label: "Outros", value: "others" },
            ]}
            onChange={(value: any) => {
              setFieldValue("type", value.value);
            }}
            errorText={errors.type}
          />
        </Grid>
      </Grid>
      <Grid container containerCenter spacing={8} vertical_spacing={6}>
        <Grid item xs={12} md={4}>
          <TextField
            fullwidth
            name="name"
            type="name"
            onBlur={handleBlur}
            value={values.name}
            onChange={handleChange}
            label="Nome"
            errorText={touched.name && errors.name}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullwidth
            name="email"
            type="email"
            onBlur={handleBlur}
            value={values.email}
            onChange={handleChange}
            placeholder="seuemail@...com"
            label="Email"
            errorText={touched.email && errors.email}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullwidth
            name="instagram"
            type="instagram"
            onBlur={handleBlur}
            value={values.instagram}
            onChange={handleChange}
            placeholder="@meuinstagram"
            label="Instagram"
            errorText={touched.instagram && errors.instagram}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullwidth
            name="phone"
            type="phone"
            onBlur={handleBlur}
            value={values.phone}
            onChange={handleChange}
            placeholder=""
            label="Telefone/Whatsapp"
            errorText={touched.phone && errors.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <TextArea
            fullwidth
            rows={8}
            id="message"
            name="message"
            label="Mensagem"
            mb="2rem"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.message || ""}
            placeholder=""
            errorText={touched.message && errors.message}
          />
        </Grid>
        <Grid item xs={12}>
          <FlexBox
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            {process.env.NODE_ENV != "development" && (
              <ReCAPTCHA
                sitekey={process.env.G_CAPTCHA_SITE_KEY}
                onChange={(value) => setFieldValue("recaptcha", value)}
              />
            )}
            <Button
              style={{ fontSize: "1.15rem" }}
              p="1.5rem"
              my="2.5rem"
              mb="5rem"
              bg="primary.main"
              color="white"
              disabled={
                StringUtils.isEmpty(values.name) ||
                StringUtils.isEmpty(values.email) ||
                StringUtils.isEmpty(values.phone) ||
                StringUtils.isEmpty(values.message) ||
                !isValid ||
                loading
              }
              onClick={() => isValid && handleFormSubmit(values)}
            >
              Enviar
            </Button>
          </FlexBox>
        </Grid>
      </Grid>
    </>
  );
};

export default ContatoPage;
