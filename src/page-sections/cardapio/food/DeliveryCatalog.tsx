import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import { H4, SemiSpan } from "@component/Typography";
import { Button } from "@component/buttons";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import APP_ROUTES from "@routes/app.routes";
import Link from "next/link";

const EmptyCatalog = () => (
  <Grid container xs={12}>
    <FlexBox
      width="100%"
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      border="1px solid"
      borderColor="gray.400"
      marginY="2rem"
      paddingY="2rem"
      borderRadius="8px"
    >
      <Icon color="secondary" size="15rem">
        story-set/image-upload-pana
      </Icon>
      <H4 color="gray.600" textAlign="center" paddingBottom="0.75rem">
        Vamos começar! Que tal adicionar a primeira categoria?
      </H4>
      <SemiSpan textAlign={"center"}>
        Para criar uma categoria, clique no botão abaixo.
      </SemiSpan>
      <SemiSpan textAlign={"center"} paddingBottom="1rem">
        Exemplo: Carnes, Lanches, Bebidas...
      </SemiSpan>
      <Link href={APP_ROUTES.DASHBOARD.CATEGORY_NEW}>
        <Button bg="primary.main" color="white" style={{ fontWeight: "400" }}>
          <Icon size="1.25rem" pr=".35rem">
            plus
          </Icon>
          Adicionar nova categoria
        </Button>
      </Link>
    </FlexBox>
    <FlexBox>
      <Link href={APP_ROUTES.DASHBOARD.MY_CATALOG_SEND_FILE_CARDAPIO}>
        <SemiSpan
          fontSize="1rem"
          color="primary.main"
          style={{ textDecoration: "underline" }}
        >
          Prefiro enviar o cardapio
        </SemiSpan>
      </Link>
    </FlexBox>
    <Divider width="100%" mb="4rem" />
  </Grid>
);

const DeliveryCatalog = () => {
  return <EmptyCatalog />;
};

export default DeliveryCatalog;
