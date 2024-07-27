import { H3, Small } from "@component/Typography";
import * as yup from "yup";
import Grid from "@component/grid/Grid";
import { useFormik } from "formik";
import { Radio, RadioGroup, Select, Stack } from "@chakra-ui/react";
import TextField from "@component/text-field";
import { mask } from "@lib/mask/lib/mask";
import { Button } from "@component/buttons";
import { useCallback } from "react";
import { LOG } from "@utils/log";

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
    document_owner: yup.string().required("Informe o CPF do dono da loja"),
    company_short_name: yup
      .string()
      .required("Nos diga qual o nome da sua loja"),
    market_type: yup.string().required("Escolha o tipo de negócio da sua loja"),
  });
};

const StoreForm = ({
  submmitValues,
  initialValues,
  setLoading,
  loading = false,
  edit= false
}: Props) => {
  const handleFormSubmit = useCallback(async (values: any) => {
    submmitValues(values);
    setLoading(true);
  }, []);

  /*
  // para acionar o swet
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const { auth, authToken, indexAuth, decodeToken } = useAppAuth();

  const displayError = useCallback(NotifyUtil.errorMsgCallback, []);
  
  const handleFormSubmit = useCallback(async (values: any) => {
    const initFetch = async () => {
      const payload: any = await rtAxios()
        .post(`${API_HOST}${ROUTES.COMPANY.NEW}`)
        .headerAuth(authToken || '')
        .data(values)
        .run();

      if (payload.status == RtRequestStatus.ERROR) {
        const result = rtAxiosErrorHandler(payload.response, {
          hasError: true,
        });
        displayError(dispatch, result?.errorMessage);
      } else {
        const token = payload.response?.data?.token;
        indexAuth(payload.response?.data?.token);

        const decoded: any =  decodeToken(token);
        dispatch({type: "USER_SESSION", payload: { auth: decoded, authToken: token}});
        router.push(APP_ROUTES.USER.LOGIN);
      }
    };
    initFetch();
  }, [authToken]);
*/

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
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: formSchema(),
  });

  return (
    <>
      <Grid container splited containerCenter spacing={8}>
        <Grid item xs={12}>
          <H3 color="primary.main">Vamos configurar sua loja?</H3>
        </Grid>
        <Grid item xs={12}>
          <form className="content" onSubmit={handleSubmit}>
            {/* <div style={{marginBottom: '0.25rem', color:"#eb4034"}}>{touched.marketOperating && errors.marketOperating}</div> */}
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
              <option value="food">Comida, lanches, pizzas, doces</option>
              <option value="water">Agua e Gás</option>
              <option value="pet">Petshop</option>
              <option value="clothes">Roupas, sapatos, acessórios</option>
              <option value="services">Prestação de serviços</option>
            </Select>
            <div style={{ marginBottom: "1.25rem" }}>
              {touched.market_type && errors.market_type && (
                <Small color="red">{errors.market_type}</Small>
              )}
            </div>

            <RadioGroup
              defaultValue="PJ"
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
                  values.type == "PJ"
                    ? mask(e.target.value, "99.999.999/9999-99")
                    : mask(e.target.value, "999.999.999-99")
                )
              }
              value={values.document_number}
              placeholder={
                values.type == "PJ" ? "00.000.000/0000-00" : "000.000.000-00"
              }
              label={values.type == "PJ" ? "CNPJ" : "CPF"}
              errorText={touched.document_number && errors.document_number}
            />

            <TextField
              fullwidth
              mb="1.25rem"
              name="document_owner"
              type="text"
              onBlur={handleBlur}
              onChange={(e: any) =>
                setFieldValue(
                  "document_owner",
                  mask(e.target.value, "999.999.999-99")
                )
              }
              value={values.document_owner}
              placeholder="000.000.000-00"
              label="CPF do responsável pela loja:"
              errorText={touched.document_owner && errors.document_owner}
            />

            <TextField
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
            />

            <TextField
              fullwidth
              mb="1.25rem"
              name="company_short_name"
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.company_short_name}
              placeholder=""
              label="Nome da loja (como sua loja deve ser vista por seus clientes):"
              errorText={
                touched.company_short_name && errors.company_short_name
              }
            />

            <Button
              mb="1.65rem"
              variant="contained"
              color="primary"
              type="submit"
              fullwidth
              disabled={isSubmitting}
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
