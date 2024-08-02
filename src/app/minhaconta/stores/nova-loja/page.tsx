"use client";
import { H3, Small } from "@component/Typography";
import * as yup from "yup";
import Grid from "@component/grid/Grid";
import { useFormik } from "formik";
import { Radio, RadioGroup, Select, Stack } from "@chakra-ui/react";
import TextField from "@component/text-field";
import { mask } from "@lib/mask/lib/mask";
import { Button } from "@component/buttons";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import { fetchPost } from "@hook/useFetch2";
import APP_ROUTES, { API_ROUTES } from "@routes/app.routes";
import { useEffect, useState } from "react";
import useNotify from "@hook/useNotify";
import { useSession } from "@supabaseutils/supabase.provider";
import { useRouter } from "next/navigation";

interface FormProps {
  person_type: string;
  document_number: string;
  document_owner: string;
  company_name: string;
  company_short_name: string;
  market_type: string;
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
    document_number: yup.string().required("Campo obrigatório"),
    // document_number_owner: yup
    //   .string()
    //   .required("Informe o CPF do dono da loja"),
    name: yup.string().required("Nos diga qual o nome da sua loja"),
    market_type: yup.string().required("Escolha o tipo de negócio da sua loja"),
  });
};

const initialValuesDefault = {
  market_type: undefined,
  person_type: "PF",
  document_number: "",
  document_number_owner: "",
  name: "",
};

const StoreForm = ({
  initialValues = initialValuesDefault,
}: {
  initialValues: any;
}) => {
  const router = useRouter();
  const URI = API_ROUTES.STORE.NEW;
  const notify = useNotify();

  const [formValues, setFormValues] =
    useState<typeof initialValuesDefault>(initialValues);
  const [loading, onLoading] = useState<boolean>(false);

  const saveData = (values: any) => {
    fetchPost(URI, values, {
      notify: true,
      headers: {},
      handleData: () => {
        router.push(APP_ROUTES.DASHBOARD.STORE.MY_STORE);
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
    isSubmitting,
  } = useFormik({
    initialValues: formValues,
    onSubmit: handleFormSubmit,
    validationSchema: formSchema(),
  });

  return (
    <>
      <Grid container splited spacing={6}>
        <Grid item xs={12}>
          <DashboardPageHeader
            divider
            title="Meu Negócio"
            iconName="store-solid"
          />
        </Grid>
      </Grid>
      <Grid container splited spacing={6}>
        <Grid item xs={12}>
          <H3 mt="1.5rem">Vamos configurar sua loja?</H3>
        </Grid>
        <Grid item xs={12}>
          <form className="content" onSubmit={handleSubmit}>
            <Select
              border={
                touched.market_type && errors.market_type
                  ? "1px solid #eb4034"
                  : "1px solid #cdcdcd"
              }
              size="lg"
              id="market_type"
              name="market_type"
              placeholder="O que você oferece aos seus clientes?"
              value={values.market_type}
              onChange={(e: any) =>
                setFieldValue("market_type", e.target.value)
              }
            >
              {/* <option value="food">Comida, lanches, pizzas, doces</option> */}
              <option value="water-gas">Água e Gás</option>
              {/* <option value="pet">Petshop</option>
              <option value="clothes">Roupas, sapatos, acessórios</option>
              <option value="services">Prestação de serviços</option> */}
            </Select>
            <div style={{ marginBottom: "1.25rem" }}>
              {touched.market_type && errors.market_type && (
                <Small color="red">{errors.market_type}</Small>
              )}
            </div>

            <RadioGroup
              defaultValue="PF"
              mb="1.25rem"
              onChange={(e: any) => setFieldValue("person_type", e)}
            >
              <Stack spacing={4} direction={["column", "row"]}>
                <Radio size="lg" value="PF">
                  Usar meu nome
                </Radio>
                <Radio size="lg" value="PJ">
                  Tenho empresa aberta
                </Radio>
              </Stack>
            </RadioGroup>

            <TextField
              fullwidth
              mb="1.25rem"
              name="document_number"
              type="text"
              onBlur={handleBlur}
              onChange={(e: any) =>
                setFieldValue(
                  "document_number",
                  values.person_type == "PJ"
                    ? mask(e.target.value, "99.999.999/9999-99")
                    : mask(e.target.value, "999.999.999-99")
                )
              }
              value={values.document_number}
              placeholder={
                values.person_type == "PJ"
                  ? "00.000.000/0000-00"
                  : "000.000.000-00"
              }
              label={values.person_type == "PJ" ? "CNPJ" : "CPF"}
              errorText={touched.document_number && errors.document_number}
            />

            <TextField
              fullwidth
              mb="1.25rem"
              name="document_owner"
              type="text"
              onBlur={handleBlur}
              disabled={values.person_type == "PF"}
              onChange={(e: any) =>
                setFieldValue(
                  "document_number_owner",
                  mask(e.target.value, "999.999.999-99")
                )
              }
              value={
                values.person_type == "PF"
                  ? values.document_number
                  : values.document_number_owner
              }
              placeholder="000.000.000-00"
              label="CPF do responsável pela loja:"
              errorText={
                touched.document_number_owner && errors.document_number_owner
              }
            />

            {/* <TextField
              fullwidth
              mb="1.25rem"
              name="company_name"
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.company_name}
              placeholder=""
              label="Razão social da sua empresa:"
              errorText={touched.company_name && errors.company_name}
            /> */}

            <TextField
              fullwidth
              mb="1.25rem"
              name="name"
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              placeholder=""
              label="Nome da loja:"
              errorText={touched.name && errors.name}
            />

            <Button
              mb="1.65rem"
              variant="contained"
              color="primary"
              type="submit"
              fullwidth
              disabled={isSubmitting || loading}
            >
              Criar minha loja
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default StoreForm;
