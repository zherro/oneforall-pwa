"use client";;
import { ReactNode } from "react";
import Box from "@component/Box";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { H2 } from "@component/Typography";
import useWindowSize from "@hook/useWindowSize";
import Grid from "@component/grid/Grid";
import Divider from "@component/Divider";

// ==============================================================
export interface DashboardPageHeaderProps {
  title?: string;
  iconName?: string;
  button?: ReactNode;
  divider?: boolean;
  splited?: boolean;
}
// ==============================================================

export default function DashboardPageHeader({
  iconName,
  title,
  button,
  divider,
  splited = false,
}: DashboardPageHeaderProps) {
  const width: any = useWindowSize();
  const isTablet = width < 1025;

  return (
    <>
      <Box mt="30px">
        <Grid container splited={splited}>
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

          {(divider && (
            <Divider height="1px" width="100%" bg="gray.400" mt="0.5rem" />
          )) || <></>}
        </Grid>

        {/* {isTablet && !!button && <Box mt="1rem">{button}</Box>} */}
      </Box>
    </>
  );
}
