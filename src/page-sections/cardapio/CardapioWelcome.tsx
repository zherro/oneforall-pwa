"use client";
import { Fragment, useEffect, useState } from "react";
import Grid from "@component/grid/Grid";
import { SemiSpan } from "@component/Typography";
import useWindowSize from "@hook/useWindowSize";
import TitleCard from "@component/cards/TitleCard";
import LinkCard from "@component/cards/LinkCard";
import APP_ROUTES from "@routes/app.routes";
import Box from "@component/Box";

const CardapioWelcome = () => {
  const [statusCategory, setStatusCategory] = useState<boolean>(false);

  const width: any = useWindowSize();
  const isTablet = (width || 0) < 745;

  useEffect(() => {}, []);

  return (
    <Fragment>
      <Grid container splited spacing={4}>
        <Grid item xs={12}>
          <TitleCard
            title="Cardápio"
            text="Escolha uma opção para montar o seu cardápio online."
            divider
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LinkCard
            link={APP_ROUTES.DASHBOARD.MY_CATALOG_SEND_FILE_CARDAPIO}
            titleIcon="fa/solid/tablet-screen-button"
            titleIconProps={{
              color: "primary",
              mt: "0.35rem",
              size: "1.15rem",
            }}
            title="Envie seu cardápio, nós digitamos"
            titleProps={{
              marginBottom: "0.5rem",
              fontWeight: "500",
            }}
          >
            <SemiSpan>
              Nos envie seu cardápio, nosso time cria as categorias de produtos
              para você.
            </SemiSpan>

            <Box mt="1rem" mb="1rem">
              <SemiSpan color="secondary.main" borderBottom="1px solid">
                ENIAR MEU CARDAPIO{" >>"}
              </SemiSpan>
            </Box>
          </LinkCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <LinkCard
            link={APP_ROUTES.DASHBOARD.MY_CATALOG}
            titleIcon="edit"
            titleIconProps={{
              color: "primary",
              mt: "0.35rem",
              size: "1.55rem",
            }}
            title="Crie um novo cardápio do zero"
            titleProps={{
              marginBottom: "0.5rem",
              fontWeight: "500",
            }}
          >
            <SemiSpan>
              Monte o seu cardápio como preferir, por aqui você pode configurar:
              categorias, produtos, complementos e muito mais.
            </SemiSpan>
            <Box mt="1rem" mb="1rem">
              <SemiSpan color="secondary.main" borderBottom="1px solid">
                PREFIRO FAZER DO MEU JEITO{" >>"}
              </SemiSpan>
            </Box>
          </LinkCard>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CardapioWelcome;
