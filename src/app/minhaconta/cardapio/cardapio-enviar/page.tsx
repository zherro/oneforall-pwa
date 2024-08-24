"use client";
import { Fragment } from "react";
import Grid from "@component/grid/Grid";
import { H3, SemiSpan } from "@component/Typography";
import { Stack } from "@chakra-ui/react";
import useWindowSize from "@hook/useWindowSize";
import Icon from "@component/icon/Icon";
import Link from "next/link";
import TitleCard from "@component/cards/TitleCard";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import APP_ROUTES from "@routes/app.routes";
import Box from "@component/Box";

const CardapioEnviarArquivo = () => {
  const width: any = useWindowSize();
  const isTablet = (width || 0) < 745;

  return (
    <Fragment>
      <Grid container splited spacing={8}>
        <Grid item xs={12}>
          <TitleCard
            goBack={APP_ROUTES.DASHBOARD.MY_CATALOG}
            title="Envie seu cardápio, nós digitamos"
            text="Nos envie seu cardápio, nosso time cria as categorias de produtos para você."
            divider
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box height="250px">
            <Stack direction={["column", "row"]}>
              <Icon color="primary" mt="0.35rem" size="1.35rem">
                fa/brands/whatsapp
              </Icon>
              <H3 marginBottom="0.5rem">Enive direto pelo Whatsapp</H3>
            </Stack>
            <FlexBox
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              paddingTop="2.5rem"
              marginBottom="1rem"
              border="1px solid"
              borderColor="gray.400"
              borderRadius="12px"
              shadow={4}
              p="3rem 1rem"
            >
              <Link
                href="https://wa.me/55065984059977?text=Olá, gostaria de enviar meu cardápio!"
                target="_blank"
              >
                <Button
                  color="primary"
                  variant="outlined"
                  style={{ fontSize: "1rem" }}
                  mb="1.55rem"
                >
                  Enviar por whatsapp
                </Button>
              </Link>
              <SemiSpan marginTop="1.5rem" fontSize="1rem">
                * duvidas? abra o link no celular
              </SemiSpan>
            </FlexBox>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction={["column", "row"]}>
            <Icon color="primary" mt="0.35rem" size="1.55rem">
              upload
            </Icon>
            <H3 marginBottom="0.5rem">Envie o cardapio por aqui</H3>
          </Stack>
          {/* <DropZone onChange={(inputs) => selectFiles(inputs)} /> */}
          <FlexBox
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            marginBottom="1rem"
            border="1px solid"
            borderColor="gray.400"
            borderRadius="12px"
            shadow={4}
            p="3rem 1rem"
          >
            <Link
              href={
                APP_ROUTES.DASHBOARD.MY_CATALOG_SEND_FILE_CARDAPIO + "/upload"
              }
            >
              <Button
                color="primary"
                variant="outlined"
                style={{ fontSize: "1rem" }}
              >
                Upload de foto ou PDF
              </Button>
            </Link>
            <SemiSpan marginTop="1.5rem" fontSize="1rem" textAlign="center">
              Em até 12 horras uteis seu cardápio estará configurado.
            </SemiSpan>
          </FlexBox>
        </Grid>

        <Grid item xs={12}>
          <FlexBox>
            <Link href={APP_ROUTES.DASHBOARD.MY_CATALOG + "?start=true"}>
              <SemiSpan
                fontSize="1rem"
                color="primary.main"
                style={{ textDecoration: "underline" }}
              >
                Prefiro fazer a minha maneira
              </SemiSpan>
            </Link>
          </FlexBox>
        </Grid>
      </Grid>
      <Box mb="7rem"></Box>
    </Fragment>
  );
};

export default CardapioEnviarArquivo;
