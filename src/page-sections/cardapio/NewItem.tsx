"use client";
import { ChangeEvent, Fragment, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import { Button } from "@component/buttons";
import { H3, SemiSpan } from "@component/Typography";
import { Stack } from "@chakra-ui/react";
import useWindowSize from "@hook/useWindowSize";
import Box from "@component/Box";
import { useSearchParams } from "next/navigation";
import ComplementsInput from "./ComplementsInput";
import ComplementsStep from "./product/ComplementsStep";
import getFormProductDetail from "./form/FormProductDetail";
import PriceStep from "./form/FormProductPrice";
import FormProductDisponibility from "./form/FormProductDisponibility";
import CategoryModel from "@supabaseutils/model/catalog/Category.model";

interface Props {
  page: string;
  cancelAction: Function;
  saveCallback: Function;
  selectedStep: number;
  setScreenContent: Function;
  backScreenContent: Function;
  submited: boolean;
  setSubmited: Function;
  files: any;
  setFiles: any;
  initialValues: any;
  category: CategoryModel | null;
  productType: any;
}

const CAT: any = {
  drink: { icon: "milk", name: "Bebidas", type: "drink" },
  all: { icon: "food", name: "Itens gerais", type: "all" },
  pizza: { icon: "extra/pizza", name: "Pizza's", type: "pizza" },
};

const NewProductItem = ({
  page,
  cancelAction,
  saveCallback,
  selectedStep,
  setScreenContent,
  backScreenContent,
  submited,
  setSubmited,
  files,
  setFiles,
  initialValues,
  category,
  productType,
}: Props) => {
  const params = useSearchParams();

  const [complements, setComplements] = useState<any[]>([]);

  const width: any = useWindowSize();
  const isTablet = width < 745;

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("Informe o nome da produto"),
    session: yup.string().required("Selecione a sessão da categoria"),
  });

  const handleFormSubmit = async (values: any) => {
    console.log(values);
    saveCallback(values);
  };

  const refreshCompList = (c: any) => setComplements([...c]);

  return (
    <Fragment>
      <Card borderRadius={8}>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
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
                    {/* <DropZone
                      onChange={(files) => {
                        console.log(files);
                      }}
                    /> */}
                    {/* <ImageUpload files={files} setFiles={setFiles} /> */}
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
                        Voltar
                      </Button>
                    )}
                    {page == "home" && selectedStep == 1 && (
                      <Button
                        onClick={() => cancelAction()}
                        variant="outlined"
                        color="error"
                      >
                        Cancelar
                      </Button>
                    )}
                    {page !== "home" && selectedStep == 4 && (
                      <Button variant="contained" color="primary">
                        Salvar Produto
                      </Button>
                    )}
                    {selectedStep <= 3 && (
                      <Button
                        onClick={(e) => {
                          setSubmited(true);
                          saveCallback(values, files);
                          setScreenContent(e);
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
                          : "Continuar"}
                      </Button>
                    )}
                  </Stack>
                </Grid>
              </Grid>

              {"" + submited}
              {"" + (values.name.length < 3)}
              {"" + (values.price.length < 4 && page == "price")}
            </form>
          )}
        </Formik>
      </Card>
    </Fragment>
  );
};

export default NewProductItem;
