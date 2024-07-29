"use client";
import { Divider, Skeleton } from "@chakra-ui/react";
import Badge from "@component/badge";
import Box from "@component/Box";
import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import StatusLabel from "@component/StatusLabel";
import Typography, { H2, SemiSpan } from "@component/Typography";
import { fetchGet, fetchPost } from "@hook/useFetch2";
import useNotify from "@hook/useNotify";
import APP_ROUTES, { API_ROUTES } from "@routes/app.routes";
import { useSession } from "@supabaseutils/supabase.provider";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const getStoreMarketTypeName = (market_type: string) => {
  switch (market_type) {
    case "water-gas":
      return "Água & Gás";

    default:
      return "";
  }
};

const MYStorePage = () => {
  const router = useRouter();
  const path = usePathname();
  const query = useSearchParams();
  const notify = useNotify();
  const { tenant } = useSession();
  const URI = API_ROUTES.STORE.LIST;
  const TENANT_URI = API_ROUTES.TENANT.CHANGE;
  const [data, handleData] = useState<any>([]);

  useEffect(() => {
    fetchGet(URI, {
      notify: true,
      headers: {},
      handleData,
      handleError: (error) => {
        notify({
          status: "error",
          description: error.message,
        });
      },
    });
  }, []);

  const changeTenant = (tenant_id: string) => {
    fetchPost(
      TENANT_URI + `/${tenant_id}`,
      {},
      {
        handleData: (data) => {
          router.push(`/minhaconta/loading-view?ref=${path}`);
        },
        handleError: (error) => {
          notify({
            status: "error",
            description: error.message,
          });
        },
      }
    );
  };

  return (
    <>
      <DashboardPageHeader divider title="Minha Loja" iconName="store-solid" />
      {tenant?.tenant_id && (
        <Grid container>
          <Grid item xs={12}>
            <FlexBox justifyContent="end" mt="0.5rem">
              <Button color="blue" variant="outlined" >
                Editar <Icon>edit</Icon>
              </Button>
            </FlexBox>
            <Box mt="1rem">
              <Typography fontSize="1.15rem">Nome:</Typography>
              <SemiSpan fontSize="1.15rem">{tenant.name}</SemiSpan>
            </Box>
            <Box mt="1rem">
              <Badge title={getStoreMarketTypeName(tenant.market_type)} />
            </Box>
            <Box mt="1rem">
              <Typography fontSize="1.15rem">Status:</Typography>
              <StatusLabel status={tenant.status} />
            </Box>
          </Grid>
        </Grid>
      )}

      {(query.get("change") && <></>) || (
        <DashboardPageHeader divider title="Nova Loja" iconName="plus" />
      )}
      <Grid container>
        {(query.get("change") && <></>) || (
          <Grid item xs={12}>
            <Link href={APP_ROUTES.DASHBOARD.STORE.NEW_STORE}>
              <Button
                ml="1rem"
                mt="1rem"
                py="1.75rem"
                variant="outlined"
                color="primary.main"
              >
                <Icon>plus</Icon> Iniciar nova loja
              </Button>
            </Link>
          </Grid>
        )}
        <Grid item xs={12}>
          <DashboardPageHeader
            divider
            title="Minhas Lojas"
            iconName="fa/regular/rectangle-list"
          />
          <Divider
            width="100%"
            bg="gray.300"
            height="1px"
            mb="1rem"
            mt="0.05rem"
          />
        </Grid>
        {data?.data?.map((store) => (
          <Grid item xs={12} sm={6} md={4} lg={3} horizontal_spacing={12}>
            <Box maxWidth="100%" paddingX="0.5rem" marginLeft="-0.5rem">
              <Box
                key={store.id}
                border="1px solid"
                borderColor="gray.500"
                borderRadius={8}
                width="100%"
                padding="1.25rem 1rem"
                marginX="1rem"
                marginBottom="1rem"
                style={{
                  float: "left",
                }}
                shadow={4}
              >
                <Typography mb="1rem" fontWeight="bold">
                  {store.name}
                </Typography>
                <FlexBox justifyContent="space-between">
                  <Badge title={getStoreMarketTypeName(store.market_type)} />
                  <StatusLabel status={store.status} />
                </FlexBox>
                {store.tenant_id}
                <FlexBox justifyContent="center">
                  <Button
                    onClick={() => changeTenant(store.tenant_id)}
                    mt="2rem"
                    color="secondary.main"
                    variant="outlined"
                  >
                    Gerenciar Loja
                  </Button>
                </FlexBox>
              </Box>
            </Box>
          </Grid>
        )) || <></>}
      </Grid>
    </>
  );
};

export default MYStorePage;
