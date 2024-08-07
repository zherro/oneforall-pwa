"use client";
import Typography, { SemiSpan } from "@component/Typography";
import * as yup from "yup";
import Grid from "@component/grid/Grid";
import { useFormik } from "formik";
import TextField from "@component/text-field";
import { Button } from "@component/buttons";
import { fetchPost } from "@hook/useFetch2";
import APP_ROUTES, { API_ROUTES } from "@routes/app.routes";
import { useEffect, useState } from "react";
import useNotify from "@hook/useNotify";
import { useRouter } from "next/navigation";
import FlexBox from "@component/FlexBox";
import Box from "@component/Box";
import MESSAGES from "@data/messages";
import Icon from "@component/icon/Icon";
import Divider from "@component/Divider";
import MiniSessionTile from "@sections/forms/MiniSessionTitle";

interface FormProps {
  name: string;
}

interface Props {
  initialValues: FormProps;
  setLoading: Function;
  loading: boolean;
  submmitValues: Function;
  edit: boolean;
}

const formSchema = () => {
  return yup.object().shape({
    name: yup.string().required(MESSAGES.FORM.VALIDADION.REQUIRED_FIELD),
  });
};

const initialValues = {
  name: "",
};

const FormConfigProduct = ({
  edit = false,
  data,
}: {
  edit: boolean;
  data: any;
}) => {
  const router = useRouter();
  const URI = API_ROUTES.ADMIN.CONFIG_PRODUCT_TABLE;
  const notify = useNotify();

  const [formValues, setFormValues] = useState<typeof initialValues>(
    data || initialValues
  );
  const [loading, onLoading] = useState<boolean>(false);

  const saveData = (values: any) => {
    fetchPost(URI, values, {
      notify: true,
      headers: {},
      handleData: () => {
        router.push(APP_ROUTES.ADMIN.CONFIG_PRODUCTS_TABLE);
      },
      handleError: (error) => {
        notify({
          status: "error",
          description: error.message,
        });
      },
      onLoading,
    });
  };

  const handleFormSubmit = async (values: any) => {
    saveData(values);
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    isValid,
    isSubmitting,
  } = useFormik({
    initialValues: formValues,
    onSubmit: handleFormSubmit,
    validationSchema: formSchema(),
  });

  return (
    <>
      <Grid container splited vertical_spacing={4}>
        <Grid item xs={12}>
          <MiniSessionTile
            mt="1.5rem"
            title="Você está criando um novo produto"
            icon="fa/solid/chalkboard-user"
            divider
          />
        </Grid>
      </Grid>

      <form
        className="content"
        onSubmit={handleSubmit}
        style={{ width: "100%" }}
      >
        <Grid container containerCenter splited>
          <Grid item xs={12}>
            <TextField
              fullwidth
              mt="0.75rem"
              mb="1.25rem"
              name="name"
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              placeholder=""
              label="Nome do Produto:"
              errorText={touched.name && errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <TextField
              fullwidth
              mb="1.25rem"
              name="ncm"
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.ncm}
              placeholder=""
              label="NCM (Nomenclatura Comum do Mercosul):"
              errorText={touched.ncm && errors.ncm}
            />
          </Grid>
          <Grid item xs={12}>
            <FlexBox justifyContent="end">
              <Button
                mb="1.65rem"
                variant="contained"
                color="primary"
                type="submit"
                disabled={!isValid || isSubmitting || loading}
              >
                Salvar Produto
              </Button>
            </FlexBox>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default FormConfigProduct;
