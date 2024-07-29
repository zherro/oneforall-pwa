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

interface CreateBucketOptions {
  types: string[];
  fileSizeLimit: number;
  public: boolean;
}

class Bucketutil {
  constructor(
    private readonly supabase: SupabaseClient<any, "public", any>,
    private readonly bucket: string
  ) {}

  async create(options: CreateBucketOptions) {
    const allowedMimeTypes: string[] = [];

    for (let i = 0; i < options.types.length; i++) {
      const type: string = Extensions[options?.types[i]];
      allowedMimeTypes.push(type);
    }

    return this.supabase.storage.createBucket(this.bucket, {
      public: options.public,
      allowedMimeTypes,
      fileSizeLimit: options.fileSizeLimit,
    });
  }

  async getBucket() {
    return await this.supabase.storage.getBucket(this.bucket);
  }

  async existBucket() {
    const { data, error } = await this.getBucket();
    return data != null;
  }

  async upload(name: string, fileBody: any) {
    return this.supabase.storage
      .from(this.bucket)
      .upload(name + this.fileTimePath(), fileBody, {
        cacheControl: "3600",
        upsert: false,
      });
  }

  private fileTimePath() {
    return new Date().toJSON().slice(0, 19).replaceAll(":", "_");
  }
}

const AddCategory = () => {
  const supabase = createClient();
  const notify = useNotify();
  const { session }: any = useSession();

  const [files, setFiles] = useState<any[]>([]);

  const width: any = useWindowSize();
  const isTablet = (width || 0) < 745;

  const saveMenuStoreFiles = async (storeItens: StoreMenuFile[]) => {
    const { data, error } = await supabase
      .from("lara_store_menu_files")
      .insert(storeItens);

    if (error)
      notify({
        status: "error",
        description: "Não foi possivel concluir o envio dos arquivos!",
      });

    notify({
      status: "success",
      description:
        "Arquivos recebidos! Em alguns minutos seu cardápio estará pronto.",
    });
  };

  const upload = useCallback(
    async (files) => {
      const bucketUtil = new Bucketutil(supabase, "stores_private");

      const storeItens: StoreMenuFile[] = [];

      for (let i = 0; i < files.length; i++) {
        const store = session?.user?.user_metadata?.tenant?.id;
        const filePath = store + "/" + files[i].name;
        const { error } = await bucketUtil.upload(filePath, files[i]);

        if (error)
          notify({
            status: "error",
            description: "Não foi possivel concluir o envio dos arquivos!",
          });

        const storeMenuFile: StoreMenuFile = {
          store_id: store,
          file_path: filePath,
        };
        storeItens.push(storeMenuFile);
      }
      saveMenuStoreFiles(storeItens);
    },
    [session, supabase]
  );

  const selectFiles = (inputs) => {
    const filesList: any[] = [];
    filesList.push(...files);
    filesList.push(...inputs);
    setFiles(filesList);

    console.log(filesList);
  };

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
            paddingTop="1rem"
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
            <DropZone onChange={(inputs) => selectFiles(inputs)} />
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
          {files?.length > 0 && (
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {files.map((file, idx) => (
                <li key={idx} style={{ marginTop: "8px" }}>
                  {/* <Box
                    pb="16px"
                    pr="0.5rem"
                    style={{
                      float: "left",
                      borderBottom: "1px solid #cdcdcd",
                      cursor: "pointer",
                    }}

                    onClick={}
                  >
                    <Icon defaultcolor="red" size={36}>
                      delete
                    </Icon>
                  </Box> */}
                  <Box
                    pb="10px"
                    style={{
                      float: "left",
                      borderBottom: "1px solid #cdcdcd",
                      width: "320px",
                    }}
                  >
                    <Box>
                      <Typography
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "clip",
                        }}
                      >
                        {file.name}
                      </Typography>
                    </Box>
                    <Box>
                      <Box style={{ float: "left", width: "50%" }}>
                        <SemiSpan>{file.type}</SemiSpan>
                      </Box>
                      <Box style={{ float: "left" }}>
                        <SemiSpan>{file.size / 1000} KB</SemiSpan>
                      </Box>
                    </Box>
                  </Box>
                </li>
              ))}
            </ul>
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
            onClick={() => upload(files)}
          >
            Enviar cardapio
          </Button>
        </FlexBox>
      )}
    </Fragment>
  );
};

export default AddCategory;
