"use client";;
import styled from "styled-components";
import * as yup from "yup";
import { Formik } from "formik";

import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";

import SwitchStatusForm from "@component/form/SwitchStatusForm";
import { LOG } from "@utils/log";
import StringUtils from "@utils/helpers/String.utils";

// STYLED COMPONENT
const UploadImageBox = styled("div")(({ theme }) => ({
  width: 70,
  height: 70,
  display: "flex",
  overflow: "hidden",
  borderRadius: "8px",
  marginRight: ".5rem",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.colors.primary[100],
}));

// ==============================================================
type Option = { label: string; value: string };

interface Props {
  submited?: boolean;
  initialValues: any;
  handleSubmit: any;
}
// ==============================================================

export default function CategoryUpdateForm({
  submited,
  initialValues,
  handleSubmit,
}: Props) {
  const validationSchema = yup.object().shape({
    full_name: yup.string().required("Campo obrigatório"),
    type: yup.string().required("Selecione um tipo"),
    slug: yup.string().required("Campo obrigatório"),
    tags: yup.array().required("Defina ao menos uma tag"),
  });

  const handleFormSubmit = async (values: typeof initialValues) => {
    LOG.debug("Loading Form DATA", values);
    handleSubmit(values);
  };

  return (
    <Card p="30px" borderRadius={8}>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={6}>
              <Grid item sm={6} xs={12}>
                <TextField
                  disabled
                  fullwidth
                  name="full_name"
                  id="full_name"
                  label="Nome"
                  placeholder=""
                  value={values.full_name}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    console.log(e);
                    handleChange(e);
                    setFieldValue(
                      "slug",
                      `${values.type || ""}-${StringUtils.slugfy(
                        e.target.value || ""
                      )}`
                    );
                  }}
                  errorText={touched.full_name && errors.full_name}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullwidth
                  disabled
                  name="email"
                  id="email"
                  label="Email"
                  placeholder=""
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    console.log(e);
                    handleChange(e);
                    setFieldValue(
                      "slug",
                      `${values.type || ""}-${StringUtils.slugfy(
                        e.target.value || ""
                      )}`
                    );
                  }}
                  errorText={touched.email && errors.email}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <SwitchStatusForm
                  label="Situação"
                  id="status"
                  setFieldValue={setFieldValue}
                  values={values}
                />
              </Grid>
            </Grid>

            <Button
              style={{ float: "right" }}
              mt="55px"
              variant="contained"
              color="primary"
              type="submit"
              disabled={submited}
            >
              {submited ? "Enviando atualização" : "Enviar"}
            </Button>
          </form>
        )}
      </Formik>
    </Card>
  );
}
