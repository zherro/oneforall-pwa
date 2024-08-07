"use client";
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "@component/Select";
import Grid from "@component/grid/Grid";
import TextArea from "@component/textarea";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Divider from "@component/Divider";
import Typography from "@component/Typography";
import { Checkbox, CheckboxGroup, Stack, Switch, Text } from "@chakra-ui/react";
import mainCategories from "@supabaseutils/model/types/mainCategories";
import { StatusEntity } from "@supabaseutils/model/types/Status.type";
import Link from "next/link";
import APP_ROUTES, { API_ROUTES } from "@routes/app.routes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fetchPost } from "@hook/useFetch2";

const initialValues = {
  name: "",
  category_type: "food",
  info: "",
  status: StatusEntity.ACTIVE,
  disponibility: ["dom", "seg", "ter", "qua", "qui", "sex", "sab"],
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Informe o nome da categoria"),
  category_type: yup.string().required("Selecione a sessão da categoria"),
});

const CategoryForm = () => {
  const selectSections = mainCategories.map((cat) => ({
    label: cat.name,
    value: cat.id,
  }));

  const router = useRouter();
  const URI = API_ROUTES.CUSTOMER.CATALOG.CATEGORY;

  const [formValues, setFormValues] =
    useState<typeof initialValues>(initialValues);
  const [loading, onLoading] = useState<boolean>(false);

  const saveData = (values: any) => {
    console.log("aaaaaa");
    fetchPost(URI, values, {
      notify: true,
      headers: {},
      handleData: () => {
        router.push(APP_ROUTES.DASHBOARD.MY_CATALOG);
      },
      onLoading,
    });
  };

  const handleFormSubmit = (values: any) => {
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
    validationSchema,
  });

  return (
    <>
      <Grid container splited spacing={4}>
        <Grid item xs={12}>
          <Divider width="100%" mb="1.5rem" mt="0.25rem" bg="gray.400" />
        </Grid>
      </Grid>

      <form onSubmit={handleSubmit}>
        <Grid container splited spacing={6}>
          <Grid item sm={6} xs={12}>
            <TextField
              fullwidth
              name="name"
              label="Nome"
              placeholder=""
              onBlur={handleBlur}
              value={values.name}
              onChange={handleChange}
              errorText={touched.name && errors.name}
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <Select
              id="category_type"
              name="category_type"
              options={selectSections}
              label="Sessão"
              value={selectSections.filter(
                (ss) => ss.value == values.category_type
              )}
              placeholder="Selecione uma sessão"
              errorText={touched.category_type && errors.category_type}
              onChange={(session: any) =>
                setFieldValue("category_type", session?.value)
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextArea
              rows={3}
              fullwidth
              name="info"
              label="+ Informações"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder=""
              value={values.info}
              errorText={touched.info && errors.info}
            />
          </Grid>

          <Divider width="100%" backgroundColor="#d5d5d7" mt="1rem" />
          <Grid item xs={12}>
            <Typography fontWeight="bold">Disponibilidade</Typography>
          </Grid>

          <Grid item xs={12}>
            <Stack align="center" direction="row">
              <Typography mb={18} fontSize="0.75rem">
                Ao configurar a disponibilidade para a categoria, a mesma será
                apresentada de acordo com os dias abaixo e com base nos{" "}
                <b>horarios de funcionamento do estabelecimento</b>.
              </Typography>
            </Stack>
            <Stack align="center" direction="row">
              <Switch
                name="status"
                size="md"
                isChecked={values.status == StatusEntity.ACTIVE}
                onChange={(event) =>
                  setFieldValue(
                    "status",
                    event.target.checked
                      ? StatusEntity.ACTIVE
                      : StatusEntity.INATIVE
                  )
                }
              />

              {values.status == StatusEntity.ACTIVE && (
                <Text color="teal" fontWeight="bold">
                  ATIVO
                </Text>
              )}
              {values.status !== StatusEntity.ACTIVE && (
                <Text color="tomato" fontWeight="bold">
                  PAUSADO
                </Text>
              )}
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Typography mb={18} fontWeight="bold">
              Dias em que a categoria estará disponivel
            </Typography>
            <CheckboxGroup
              colorScheme="green"
              onChange={(event) => setFieldValue("disponibility", event)}
              defaultValue={values.disponibility}
            >
              <Stack spacing={[1, 5]} direction={["column", "row"]}>
                <Checkbox value="dom">dom</Checkbox>
                <Checkbox value="seg">seg</Checkbox>
                <Checkbox value="ter">ter</Checkbox>
                <Checkbox value="qua">qua</Checkbox>
                <Checkbox value="qui">qui</Checkbox>
                <Checkbox value="sex">sex</Checkbox>
                <Checkbox value="sab">sab</Checkbox>
              </Stack>
            </CheckboxGroup>
          </Grid>

          <Grid item xs={12}>
            <Stack justifyContent="end" direction="row" mb="2rem" spacing={4}>
              <Link href={APP_ROUTES.DASHBOARD.MY_CATALOG}>
                <Button
                  style={{ float: "right" }}
                  mt="50px"
                  variant="outlined"
                  color="primary"
                  type="button"
                  disabled={loading}
                >
                  Cancelar
                </Button>
              </Link>
              <Button
                style={{ float: "right" }}
                mt="50px"
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Salvar"}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default CategoryForm;
