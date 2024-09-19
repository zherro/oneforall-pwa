"use client";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import { Button } from "@component/buttons";
import { H3, SemiSpan } from "@component/Typography";
import { Stack } from "@chakra-ui/react";
import Box from "@component/Box";
import { useSearchParams } from "next/navigation";
import ComplementsInput from "./ComplementsInput";
import ComplementsStep from "./product/ComplementsStep";
import getFormProductDetail from "./form/FormProductDetail";
import PriceStep from "./form/FormProductPrice";
import FormProductDisponibility from "./form/FormProductDisponibility";
import CategoryModel from "@supabaseutils/model/catalog/Category.model";
import Link from "next/link";
import APP_ROUTES from "@routes/app.routes";
import FileUpload from "@sections/FileUpload";
import ObjectUtils from "@utils/helpers/Object.utils";

interface Props {
  page: string;
  saveCallback: Function;
  selectedStep: number;
  nextStep: Function;
  backScreenContent: Function;
  submited: boolean;
  files: any;
  setFiles: any;
  initialValues: any;
  category: CategoryModel | null;
  productType: any;
}

const validationSchema = yup.object().shape({
  name: yup.string().required("Informe o nome da produto"),
  session: yup.string().required("Selecione a sessão da categoria"),
});

const NewProductItem = ({
  page,
  saveCallback,
  selectedStep,
  nextStep,
  backScreenContent,
  submited,
  files,
  setFiles,
  initialValues,
  category,
  productType,
}: Props) => {
  const params = useSearchParams();

  const [complements, setComplements] = useState<any[]>([]);
  const loadedFiles = useCallback(
    (f) => {
      setFiles([...f]);
    },
    [setFiles]
  );

  const handleFormSubmit = async (values: any) => {
    if (!submited) {
      saveCallback(values);
    }
  };

  const refreshCompList = (c: any) => setComplements([...c]);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
    isValid,
    isSubmitting,
  } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema,
  });

  // Use o useEffect para atualizar os valores quando initialValues mudar
  useEffect(() => {
    setValues(initialValues);
  }, [initialValues, setValues]);

  return (
    <Fragment>
      <Card borderRadius={8}>
        <form onSubmit={handleSubmit}>
          {page == "home" &&
            getFormProductDetail(
              category,
              productType,
              values,
              setFieldValue,
              handleBlur,
              handleChange,
              touched,
              errors
            )}
          <input type="hidden" id="id" name="id" value={values.id} />
          <input
            type="hidden"
            id="tenant_id"
            name="tenant_id"
            value={values.tenant_id}
          />

          {page == "price" && (
            <Grid container splited spacing={1}>
              <PriceStep
                handleBlur={handleBlur}
                values={values}
                setFieldValue={setFieldValue}
                touched={touched}
                errors={errors}
              />
            </Grid>
          )}

          {page == "image" && (
            <Grid container splited spacing={12}>
              <Grid item xs={12}>
                <H3 marginBottom="0.5rem">Imagens do produto</H3>
                <SemiSpan>
                  - A primeira imagem selecionada aparecerá na listagem.
                </SemiSpan>
                <br />
                <SemiSpan>
                  - As demais imagens serão mostradas nos detalhes do item.
                </SemiSpan>
                <br />
                <SemiSpan>- Imagens: PNG, JPG, JPEG.</SemiSpan>
                <Box width="100%" marginTop="2rem" />
                <FileUpload
                  multiple={false}
                  savedFiles={files}
                  onSelect={loadedFiles}
                />
              </Grid>
            </Grid>
          )}

          {page == "disponibility" && (
            <FormProductDisponibility
              values={values}
              setFieldValue={setFieldValue}
            />
          )}

          {page == "complements" && (
            <>
              {complements?.map((comp: any, idx: any) => (
                <Grid container splited spacing={12} key={idx}>
                  <Grid item xs={12}>
                    <H3 marginBottom="0.5rem">Complementos</H3>
                    {/* {comp.name}{" "}
                        <div color="gray.600">
                          {comp.required == true
                            ? "- obrigatório"
                            : " - opcional"}
                        </div>
                        {comp.itens?.map((cmp: any, idx: any) => (
                          <div key={idx}>
                            {cmp.name}
                            {cmp.price}
                          </div>
                        ))} */}
                  </Grid>
                  <Grid item xs={12}>
                    <ComplementsInput
                      comp={comp}
                      addComp={(c: any) => {
                        comp.itens.push(c);
                        const a = complements;
                        refreshCompList(a);
                      }}
                    />
                  </Grid>
                </Grid>
              ))}

              {/* <ComplementsGroupInput
                    setCompName={setCompName}
                    compName={compName}
                    setComplements={setComplements}
                    complements={complements}
                  /> */}

              <ComplementsStep
                value={"" + values.has_complements}
                onChange={(value: string) =>
                  setFieldValue("has_complements", value == "true")
                }
              />
            </>
          )}

          <Grid container splited spacing={8}>
            <Grid item xs={12}>
              <Stack
                spacing={6}
                direction={["column", "row"]}
                justifyContent="end"
                mt={page == "image" ? "5rem" : "1rem"}
              >
                {page !== "home" && selectedStep > 1 && (
                  <Button
                    type="button"
                    onClick={(e) => backScreenContent(e)}
                    variant="outlined"
                    color="primary"
                  >
                    Anterior
                  </Button>
                )}
                {page == "home" && selectedStep == 1 && (
                  <Link href={APP_ROUTES.DASHBOARD.MY_CATALOG}>
                    <Button variant="outlined" color="primary">
                      Ver meu Catalogo
                    </Button>
                  </Link>
                )}
                {ObjectUtils.nonNull(values.id) && (
                  <Button
                    onClick={(e) => nextStep(e)}
                    variant="outlined"
                    color="primary"
                    type="button"
                  >
                    Próximo
                  </Button>
                )}
                {page !== "home" && selectedStep == 4 && (
                  <Button
                    disabled={submited}
                    onClick={(e) => {
                      saveCallback(values, files);
                      setFiles([]);
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Salvar Produto
                  </Button>
                )}
                {selectedStep <= 3 && (
                  <Button
                    onClick={(e) => {
                      saveCallback(values, files);
                      setFiles([]);
                    }}
                    variant="contained"
                    color="primary"
                    disabled={
                      submited ||
                      values.name.length < 3 ||
                      (values.price.length < 4 && page == "price")
                    }
                  >
                    {files?.length > 0 && page == "image"
                      ? "Enviar Fotos"
                      : "Salvar"}
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Fragment>
  );
};

export default NewProductItem;
