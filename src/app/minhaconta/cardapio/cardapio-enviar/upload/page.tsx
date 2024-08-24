"use client";
import { Divider } from "@chakra-ui/react";
import FlexBox from "@component/FlexBox";
import Typography, { SemiSpan } from "@component/Typography";
import { Button } from "@component/buttons";
import Grid from "@component/grid/Grid";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import { fetchPost } from "@hook/useFetch2";
import APP_ROUTES, { API_ROUTES } from "@routes/app.routes";
import FileUpload from "@sections/FileUpload";
import { FileData } from "@supabaseutils/model/FileData";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const CardapioUploadPage = () => {
  const API_URI = API_ROUTES.CUSTOMER.CATALOG.SEND_CATALOG_FILE;
  const [files, setFileList] = useState<FileData[]>([]);

  const router = useRouter();

  const loadedFiles = useCallback(
    (f) => {
      setFileList([...f]);
    },
    [setFileList]
  );

  const upload = (body: any[]) => {
    fetchPost(
      API_URI + "?create_ticket=true&ticket_type=criar_cardapio",
      body,
      {
        notify: true,
        handleData: () =>
          router.push(
            APP_ROUTES.DASHBOARD.MY_CATALOG_SEND_FILE_CARDAPIO + "/completed"
          ),
      }
    );
  };

  return (
    <>
      <DashboardPageHeader
        title="Enviar Foto/PDF do meu catalogo."
        iconName="upload"
      />
      <Grid container>
        <Grid item xs={12}>
          <Divider width="1005" mt="2rem" />
          <FileUpload savedFiles={files} onSelect={loadedFiles} />
          <Typography m="1rem" textAlign="right">
            {files.length} arquivos
          </Typography>
        </Grid>
      </Grid>

      {files?.length <= 0 && (
        <Grid item xs={12}>
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
        </Grid>
      )}
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
          padding="1.5rem"
          justifyContent="center"
        >
          <Button
            paddingY="0.35rem"
            color="white"
            backgroundColor="primary.main"
            onClick={() => upload(files)}
          >
            Enviar cardapio
          </Button>
        </FlexBox>
      )}
    </>
  );
};

export default CardapioUploadPage;
