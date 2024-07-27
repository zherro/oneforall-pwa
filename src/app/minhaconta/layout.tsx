"use client";
import { Skeleton, SkeletonCircle } from "@chakra-ui/react";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import { H2 } from "@component/Typography";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import DashboardNavigation from "@component/layout/DashboardNavigation";
import AppLayout from "@component/layout/layout-1";
import { AuthGuard } from "@supabaseutils/supabase.provider";
import styled from "styled-components";
import StoryLoadBoard from "./StoryLoadBoard";
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

const SkelectonBoard = () => {
  return (
    <>
      <Box width="100%" height="70px" style={{ float: "left" }}>
        <Skeleton width="100%" height="70px" />
      </Box>
      <Box
        mt="0.5rem"
        mx="0.5rem"
        width="20%"
        maxWidth="250px"
        height="80vh"
        style={{ float: "left" }}
      >
        <Skeleton width="100%" maxWidth="250px" height="80vh" />
      </Box>
      <Box
        mt="1rem"
        mx="1rem"
        style={{ float: "left" }}
        width="63%"
        maxWidth="70%"
      >
        <Skeleton width="100%" height="80px" mb="1rem" />
        <SkeletonCircle size="90px" style={{ float: "left" }} />
        <Skeleton
          mt="0.5rem"
          width="70%"
          height="80px"
          ml="1rem"
          style={{ float: "left" }}
        />
      </Box>
      <Box mt="1rem" mx="1rem" style={{ float: "left" }} width="63%">
        <Skeleton width="100%" height="180px" mt="0.75rem" />
      </Box>
    </>
  );
};


export default function Layout({ children }) {
  return (
    <AuthGuard skelecton={<StoryLoadBoard />}>
      <AppLayout fluidHeader={true}>
        <Grid container>
          <StyledGrid lg={3}>
            <DashboardNavigation></DashboardNavigation>
          </StyledGrid>
          <StyledGridContainer item lg={9} xs={12}>
            <Box maxWidth={"100%"}>{children}</Box>
          </StyledGridContainer>
        </Grid>
      </AppLayout>
    </AuthGuard>
  );
}
