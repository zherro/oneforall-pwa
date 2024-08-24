"use client";
import { Divider } from "@chakra-ui/react";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import Pagination from "@component/pagination";
import { SearchInput } from "@component/search-box";
import TableResponsive, {
  TableCell,
  TableRow,
} from "@component/table-responsive";
import Typography, { H2, SemiSpan, Span } from "@component/Typography";
import { useLaraTheme } from "@context/app-context/AppContext";
import { usePagination } from "@hook/usePagination";
import { API_ROUTES } from "@routes/app.routes";
import DefaultList from "@sections/forms/DefaultList";
import statusOf from "@supabaseutils/model/types/Status.type";
import { useSupabaseContext } from "@supabaseutils/supabase.provider";
import Link from "next/link";
import { useState } from "react";

const MyAccountHomePage = () => {
  const theme = useLaraTheme();
  const context = useSupabaseContext();

  const [searching, setSearching] = useState(false);

  const URI = API_ROUTES.SUPORT_CENTER.TICKETS_ALL;
  const [onboard, handleData] = useState<any>([]);

  const {
    data,
    loading,
    deleting,
    error,
    page,
    setPage,
    deletePost,
    handlePageChange,
  } = usePagination(URI);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <H2>Solicitações (OS)</H2>
          <Divider width="100%" my="1rem" />
        </Grid>
        <Grid item xs={12}>
          <Box width="100%" maxWidth={600} style={{ float: "right" }}>
            <SearchInput
              iconbtn={true}
              finding={searching}
              placeholder="Nome, tipo, email ou ID"
              onSearch={(q) => {
                console.log(q);
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Divider width="100%" my="1rem" />
        </Grid>
      </Grid>
      <TableResponsive
        headerBg={theme.colors.primary[400]}
        headers={["ID", "Nome", "Tipo", "Status", "Infos"]}
        colorBlue={theme.colors.primary.light}
      >
        {data?.data?.map((ticket) => (
          <TableRow key={ticket.id}>
            <TableCell title="ID">
              <Span fontSize="1.10rem">{ticket.id}</Span>
            </TableCell>
            <TableCell title="Nome">
              <Span fontSize="1.10rem">{ticket.name}</Span>
            </TableCell>
            <TableCell title="Tipo">
              <Span fontSize="1.10rem">{ticket.type}</Span>
            </TableCell>
            <TableCell title="Status">
              <Span fontSize="1.10rem">{statusOf(ticket.status)}</Span>
            </TableCell>
            <TableCell title="Infos">
              {"criar_cardapio" == ticket.type && (
                <Span fontSize="1.10rem">{ticket.asset_data?.name}</Span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableResponsive>

      <FlexBox justifyContent="center" mt="2.5rem">
        <Pagination
          page={page || 0}
          pageCount={Math.ceil((data?.total || 0) / (data?.size || 1)) || 1}
          onChange={(data) => setPage(data + 1)}
        />
      </FlexBox>
    </>
  );
};

export default MyAccountHomePage;
