import Box from "@component/Box";
import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Header from "@component/header/Header";
import Navbar from "@component/navbar/Navbar";
import Sticky from "@component/sticky";
import Typography, { H2, H3 } from "@component/Typography";
import Link from "next/link";
import { Suspense } from "react";

const ContatoRecebidoPage = async () => {
  return (
    <>
      <Sticky fixedOn={0} scrollDistance={300}>
        <Suspense>
          <Header />
        </Suspense>
      </Sticky>
      <Navbar />
      <Grid container containerCenter spacing={8}>
        <Grid item xs={12}>
          <Box style={{ minHeight: "60vh" }} pt="15vh">
            <H2 textAlign="center">Tudo certo! Recebemos seu contato.</H2>
            <Typography textAlign="center" my="1rem" fontSize="1.15rem">
              Em breve um de nossos atendentes entrará em contato.
            </Typography>
            <FlexBox flexWrap="wrap" justifyContent="center">
              <Link href="/">
                <Button variant="contained" color="primary" m="0.5rem">
                  Ir para a Home
                </Button>
              </Link>
            </FlexBox>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ContatoRecebidoPage;
