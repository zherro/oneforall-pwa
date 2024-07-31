import Box from "@component/Box";
import { Button } from "@component/buttons";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Typography, { H3, SemiSpan } from "@component/Typography";
import APP_ROUTES from "@routes/app.routes";
import Link from "next/link";
import { maxWidth } from "styled-system";

const CardapioSendCompleted = () => {
  return (
    <>
      <Box textAlign="center">
        <FlexBox justifyContent="center">
          <Icon size="295px">story-set/image-upload-pana</Icon>
        </FlexBox>
        <H3 fontWeight="600" mb="1rem">
          Tudo certo!
        </H3>
        <SemiSpan my="1rem" fontSize="1rem">
          Recebemos os arquivos, logo logo vamos dar aquela atenção especial, e
          te ajudar a vender mais!
        </SemiSpan>
        <Divider width="100%" mb="2rem" />
        <FlexBox justifyContent="center">
          <Link href={APP_ROUTES.DASHBOARD.MY_CATALOG_SEND_FILE_CARDAPIO}>
            <Button mr="0.75rem" variant="outlined" color="primary.main">
              Enviar outro arquivo
            </Button>
          </Link>
          <Link href={APP_ROUTES.DASHBOARD.HOME}>
            <Button ml="0.75rem" bg="primary.main" color="white">
              Continuar
            </Button>
          </Link>
        </FlexBox>
      </Box>
    </>
  );
};

export default CardapioSendCompleted;
