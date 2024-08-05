"use client";;
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import { H2 } from "@component/Typography";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import AppLayout from "@component/layout/layout-1";
import { AuthGuard } from "@supabaseutils/supabase.provider";
import styled from "styled-components";
// import SubFooter from "@component/footer/SubFooter";

export const StyledGrid = styled(Grid)`
  padding: 0px 1rem;
  @media only screen and (max-width: 1124px) {
    display: none;
  }
`;

export const StyledGridContainer = styled(Grid)`
  padding: 0px 1rem;
  @media only screen and (max-width: 1124px) {
    min-width: 100% !important;
  }
`;

const StoryLoadBoard = () => {
  return (
    <>
      <H2 textAlign="center" mt="2rem" mb="3rem">
        Estamos preparando tudo pra você! Só um instante.
      </H2>
      <FlexBox justifyContent="center">
        <Icon size="320px">story-set/Design-stats-amico</Icon>
      </FlexBox>
    </>
  );
};

export default function Layout({ children }) {
  return (
    <AuthGuard skelecton={<StoryLoadBoard />}>
      <AppLayout showMenu={false} fluidHeader={true}>
        <Grid container>
          <StyledGridContainer item xs={12}>
            <Box maxWidth={"100%"}>{children}</Box>
          </StyledGridContainer>
        </Grid>
      </AppLayout>
    </AuthGuard>
  );
}
