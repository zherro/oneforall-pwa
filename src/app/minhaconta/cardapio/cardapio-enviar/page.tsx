"use client";
import { ChangeEvent, Fragment, useCallback, useEffect, useState } from "react";
import Grid from "@component/grid/Grid";
import Typography, { H3, SemiSpan } from "@component/Typography";
import { Stack } from "@chakra-ui/react";
import useWindowSize from "@hook/useWindowSize";
import Icon from "@component/icon/Icon";
import Link from "next/link";
import TitleCard from "@component/cards/TitleCard";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import APP_ROUTES from "@routes/app.routes";
import { createClient } from "@supabaseutils/utils/client";
import Box from "@component/Box";
import { useSession } from "@supabaseutils/supabase.provider";
import { SupabaseClient } from "@supabase/supabase-js";
import useNotify from "@hook/useNotify";
import { Extensions } from "@supabaseutils/types/Extensions";
import { StoreMenuFile } from "@supabaseutils/model/file/StoreMenuFile.model";
import DropZone from "@component/DropZone";
import FileUpload from "@sections/FileUpload";

const CardapioEnviarArquivo = () => {
  const supabase = createClient();
  const notify = useNotify();
  const { session }: any = useSession();

  const [files, setFiles] = useState<any[]>([]);

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
          >
            <Link
              href="https://wa.me/55065984059977?text=Olá, gostaria de enviar meu cardápio!"
              target="_blank"
            >
              <Button color="white" backgroundColor="primary.main">
                Eviar por whatsapp
              </Button>
            </Link>
            <SemiSpan marginTop="0.5rem">
              * duvidas? abra o link no celular
            </SemiSpan>
          </FlexBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <Link href="#">
            <Stack direction={["column", "row"]}>
              <Icon color="primary" mt="0.35rem" size="1.55rem">
                upload
              </Icon>
              <H3 marginBottom="0.5rem">Envie o cardapio por aqui</H3>
            </Stack>
            {/* <DropZone onChange={(inputs) => selectFiles(inputs)} /> */}
            <FileUpload savedFiles={files} onChange={setFiles} />
          </Link>
        </Grid>
        <Grid item xs={12}>
          {files?.length <= 0 && (
            <FlexBox>
              <Link href={APP_ROUTES.DASHBOARD.MY_CATALOG}>
                <SemiSpan
                  fontSize="1rem"
                  color="primary.main"
                  style={{ textDecoration: "underline" }}
                >
                  Prefiro fazer a minha maneira
                </SemiSpan>
              </Link>
            </FlexBox>
          )}
        </Grid>
      </Grid>
      <Box mb="7rem"></Box>
      {(files?.length || 0) > 0 && (
        <FlexBox
          style={{
            position: "fixed",
            zIndex: "999",
            bottom: "0",
            left: "0",
            boxShadow: "5px 15px 15px 8px",
            marginLeft: "-15px",
          }}
          width="102%"
          backgroundColor="gray.white"
          padding="0.75rem"
          justifyContent="center"
        >
          <Button
            paddingY="0.35rem"
            color="white"
            backgroundColor="primary.main"
            // onClick={() => upload(files)}
          >
            Enviar cardapio
          </Button>
        </FlexBox>
      )}
    </Fragment>
  );
};

export default CardapioEnviarArquivo;
