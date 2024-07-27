"use client";
import { ReactNode, useState } from "react";
import Box from "@component/Box";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { H2 } from "@component/Typography";
import useWindowSize from "@hook/useWindowSize";
import Sidenav from "@component/sidenav/Sidenav";
import { DashboardNavigationMenu } from "./DashboardNavigation";
import { IconButton } from "../buttons";
import Grid from "@component/grid/Grid";
import Divider from "@component/Divider";

// ==============================================================
export interface DashboardPageHeaderProps {
  title?: string;
  iconName?: string;
  button?: ReactNode;
  divider?: boolean;
}
// ==============================================================

export default function DashboardPageHeader({
  iconName,
  title,
  button,
  divider
}: DashboardPageHeaderProps) {
  const [open, setOpen] = useState(false);

  const toggleSidenav = () => setOpen((open) => !open);

  const width: any = useWindowSize();
  const isTablet = width < 1025;

  return (
    <>
      <Box mt="30px">
        <Grid container spacing={6}>
          <Grid item sm={8} xs={10}>
            <FlexBox>
              {iconName ? <Icon color="primary">{iconName}</Icon> : null}
              <H2 ml="12px" my="0px" lineHeight="1" whitespace="pre">
                {title}
              </H2>
            </FlexBox>
          </Grid>

          <Grid item sm={4} xs={2}>
            {button}
          </Grid>
        </Grid>
        {divider && <Divider height="1px" width="100%" bg="gray.400" mt="0.5rem" />}

        {/* {isTablet && !!button && <Box mt="1rem">{button}</Box>} */}
      </Box>
    </>
  );
}
