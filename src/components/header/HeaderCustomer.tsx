"use client";
import Link from "next/link";
import { useState } from "react";

import Box from "@component/Box";
import Image from "@component/Image";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import Container from "@component/Container";
import { Tiny } from "@component/Typography";
import { Button, IconButton } from "@component/buttons";
import { useAppContext } from "@context/app-context";
import StyledHeader from "./styles";
import { useRouter } from "next/navigation";
import APP_ROUTES from "@routes/app.routes";
import { H1 } from "../Typography";
import { useSession } from "@supabaseutils/supabase.provider";
import { logout } from "app/(auth)/actions";
import Sidenav from "@component/sidenav/Sidenav";
import { useWindowIsTablet } from "@hook/useWindowSize";
import { DashboardNavigationMenu } from "@component/layout/DashboardNavigation";

// ====================================================================
type HeaderProps = {
  isFixed?: boolean;
  fluid?: boolean;
  className?: string;
  showMenu?: boolean;
};
// =====================================================================

export default function HeaderCustomer({
  isFixed,
  fluid,
  className,
  showMenu = true,
}: HeaderProps) {
  const signout: any = logout;
  const { state } = useAppContext();
  const { isAuthenticated } = useSession();
  const [open, setOpen] = useState(false);
  const toggleSidenav = () => setOpen(!open);
  const router = useRouter();

  const isTablet: any = useWindowIsTablet();

  const CART_HANDLE = (
    <Box ml="20px" position="relative">
      <IconButton bg="gray.200" p="12px" size="small">
        <Icon size="20px">bag</Icon>
      </IconButton>

      {!!state.cart.length && (
        <FlexBox
          top={-5}
          right={-5}
          height={20}
          minWidth={20}
          bg="primary.main"
          borderRadius="50%"
          alignItems="center"
          position="absolute"
          justifyContent="center"
        >
          <Tiny color="white" fontWeight="600" lineHeight={1}>
            {state.cart.length}
          </Tiny>
        </FlexBox>
      )}
    </Box>
  );

  return (
    <StyledHeader
      className={className}
      style={{ boxShadow: "rgb(51, 51, 51) 0px -20px 11px 15px" }}
    >
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
        fluid={fluid || false}
      >
        <FlexBox className="logo" alignItems="center" mr="1rem">
          <Link href="/">
            <Image
              style={{ maxWidth: "120px", marginLeft: "15px" }}
              src="/assets/images/logo.png"
              alt="logo"
            />
          </Link>
        </FlexBox>

        <FlexBox justifyContent="center" flex="1 1 0">
          <H1></H1>
        </FlexBox>

        <FlexBox className="header-right" alignItems="center">
          {(!isAuthenticated || false) && (
            <>
              <Link
                href="/login"
                style={{ border: "1px solid #cdcdcd", borderRadius: 6 }}
              >
                <Button>Entrar</Button>
              </Link>
              <Link
                href="/signup"
                style={{
                  border: "1px solid #cdcdcd",
                  borderRadius: 6,
                  marginLeft: "1rem",
                }}
              >
                <Button>Criar Conta</Button>
              </Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <IconButton
                onClick={() => router.push(APP_ROUTES.AUTH.LOGIN)}
                ml="1rem"
                bg="gray.200"
                p="8px"
              >
                <Icon size="28px">user</Icon>
              </IconButton>
              {(!showMenu || !isTablet) && (
                <form>
                  <Button color="error" formAction={signout}>
                    Sair{" "}
                    <Icon size="1rem" ml="0.75rem">
                      fa/solid/arrow-right-from-bracket
                    </Icon>
                  </Button>
                </form>
              )}
              {showMenu && isTablet && (
                <Sidenav
                  open={open}
                  position="left"
                  toggleSidenav={toggleSidenav}
                  handle={
                    <IconButton onClick={() => toggleSidenav()} mx="1rem">
                      <Icon>menu</Icon>
                    </IconButton>
                  }
                >
                  <DashboardNavigationMenu />
                </Sidenav>
              )}
            </>
          )}
          {/* <Sidenav
            open={open}
            width={380}
            position="right"
            handle={CART_HANDLE}
            toggleSidenav={toggleSidenav}>
            <MiniCart toggleSidenav={toggleSidenav} />
          </Sidenav> */}
        </FlexBox>
      </Container>
    </StyledHeader>
  );
}
