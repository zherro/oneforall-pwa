import { Stack } from "@chakra-ui/react";
import SwitchField from "@component/custom/SwitchField";
import Divider from "@component/Divider";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import TextField from "@component/text-field";
import TextArea from "@component/textarea";
import Typography, { SemiSpan } from "@component/Typography";
import CategoryModel from "@supabaseutils/model/catalog/Category.model";
import { ChangeEvent } from "react";

const SelectedCategory = ({
  category,
  productType,
}: {
  category: CategoryModel | null;
  productType: any;
}) => (
  <Grid container>
    <Grid item xs={12} md={6}>
      <Typography mt="2rem" marginBottom="1rem" fontWeight="600">
        Categoria
      </Typography>
      <Stack direction={"row"}>
        <Typography marginTop="0.20rem">{category?.name}</Typography>
      </Stack>
    </Grid>
    <Grid item xs={12} md={6}>
      <Typography mt="2rem" marginBottom="1rem" fontWeight="600">
        Tipo do Produto
      </Typography>
      <Stack direction={"row"}>
        <Icon color="primary">{productType.icon}</Icon>
        <SemiSpan marginTop="0.20rem">{productType.title}</SemiSpan>
      </Stack>
    </Grid>
  </Grid>
);

export default function getFormProductDetail(
  category: CategoryModel | null,
  productType: any,
  values: any,
  setFieldValue,
  handleBlur,
  handleChange: {
    (e: ChangeEvent<any>): void;
    <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
      ? void
      : (e: string | ChangeEvent<any>) => void;
  },
  touched,
  errors
) {
  return (
    <Grid container splited spacing={2}>
      <Grid item xs={12}>
        <SelectedCategory category={category} productType={productType} />
      </Grid>
      <Grid item xs={12} spacing={0}>
        <Grid container>
          <Grid item xs={12} spacing={0}>
            <Divider width="100%" mt="1rem" mb="1rem" />
            <Typography marginBottom="1rem" fontWeight="500">
              Produto disponivel para:
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <SwitchField
              isChecked={values.sale_delivery}
              id="sale_delivery"
              label="Venda por delivery?"
              value={values.sale_delivery}
              setFieldValue={setFieldValue}
            />
          </Grid>
          <Grid item xs={12} md={6} spacing={0}>
            <SwitchField
              isChecked={values.sale_pickup_in_store}
              id="sale_pickup_in_store"
              label="Retirada na loja?"
              value={values.sale_pickup_in_store}
              setFieldValue={setFieldValue}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} spacing={0}>
        <Divider width="100%" mt="1rem" />
      </Grid>
      <Grid item xs={12} spacing={0}>
        <TextField
          mt="1rem"
          fullwidth
          id="name"
          name="name"
          label="Nome (Obrigatório)"
          placeholder=""
          onBlur={handleBlur}
          value={values.name}
          onChange={handleChange}
          errorText={touched.name && errors.name}
        />
      </Grid>

      <Grid item xs={12}>
        <TextArea
          mt="1rem"
          rows={4}
          fullwidth
          name="description"
          label="Descrição (Opcional)"
          placeholder="Aqui você pode descrever os ingredientes do item ou uma descrição bem legal."
          onBlur={handleBlur}
          value={values.description}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
}
