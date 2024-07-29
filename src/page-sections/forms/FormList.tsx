"use client";
import { useState } from "react";
// GLOBAL CUSTOM COMPONENTS
import Hidden from "@component/hidden";
import FlexBox from "@component/FlexBox";
import TableRow from "@component/TableRow";
import { H5 } from "@component/Typography";
import { API_ROUTES } from "@routes/app.routes";
import Grid from "@component/grid/Grid";
import { Skeleton, Stack } from "@chakra-ui/react";
import DefaultList from "@sections/forms/DefaultList";
import { usePagination } from "@hook/usePagination";
import { SearchInput } from "@component/search-box";
import MiniSessionTile from "./MiniSessionTitle";

export default function FormList({
  api_resource = API_ROUTES.ADMIN.CONFIG_PRODUCT_TABLE,
}) {
  const {
    data,
    loading,
    deleting,
    error,
    page,
    setPage,
    deletePost,
    handlePageChange,
  } = usePagination(api_resource);

  const [searching, setSearching] = useState(false);
  const [filter, setFilter] = useState<{
    query?: string;
    categories?: any[];
    tags?: any[];
  }>({});

  const OnLoad = () => (
    <Stack px="2rem" mt="1rem">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
        <FlexBox key={idx}>
          <Skeleton height="70px" width="85px" borderRadius={"50%"} />
          <div style={{ width: "1rem" }}></div>
          <Skeleton height="70px" width="100%" borderRadius="4px" />
        </FlexBox>
      ))}
    </Stack>
  );

  return (
    <>
      <Grid container splited vertical_spacing={6}>
        <Grid item xs={12}>
          <MiniSessionTile title="Pesquisa" icon="search" divider />
          {/* <SearchInputWithCategory /> */}
          <Grid item xs={12} md={8}>
            <SearchInput
              finding={searching}
              placeholder="Nome do protuto..."
              onSearch={(q) => {
                console.log(q);
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Hidden down={769}>
            <TableRow
              padding="0px 18px"
              mb="-0.125rem"
              boxShadow="none"
              backgroundColor="transparent"
            >
              <FlexBox my="0px" mx="6px" flex="2 2 220px !important">
                <H5 ml="56px" color="text.muted" textAlign="left">
                  Nome
                </H5>
              </FlexBox>

              <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
                Status
              </H5>

              <H5 color="text.muted" my="0px" mx="6px" textAlign="left"></H5>

              <H5 color="text.muted" my="0px" mx="6px" textAlign="left"></H5>

              <H5
                flex="0 0 0 !important"
                color="text.muted"
                px="22px"
                my="0px"
              />
            </TableRow>
          </Hidden>

          {/* {(submited || searching) && <OnLoad />}
          {!submited && !searching && (data?.total || 0) <= 0 && (
            <Typography mt="2rem" textAlign="center" fontSize="1.1rem">
              Nenhum resultado encontrado
            </Typography>
          )} */}
          {!loading && (data?.total || 0) > 0 && (
            <DefaultList
              api_uri={API_ROUTES.ADMIN.USERS}
              deletePost={deletePost}
              data={data?.data || []}
              dataMap={[
                { field: "id", type: "key" },
                { field: "name", type: "text" },
                { field: "status", type: "status" },
              ]}
              meta={{
                page: page,
                size: data?.size,
                total: data?.total,
              }}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}
