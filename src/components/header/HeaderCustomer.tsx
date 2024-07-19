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
import { isAuthenticated } from "@utils/session";

// ====================================================================
type HeaderProps = { isFixed?: boolean; className?: string };
// =====================================================================

export default function HeaderCustomer({ isFixed, className }: HeaderProps) {
  const { state } = useAppContext();
  const { session } = useSession();
  const [open, setOpen] = useState(false);
  const toggleSidenav = () => setOpen(!open);
  const router = useRouter();

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
    <StyledHeader className={className}>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
      >
        <FlexBox className="logo" alignItems="center" mr="1rem">
          <Link href="/">
            <Image
              style={{ maxWidth: "120px", marginLeft: "15px" }}
              src="/assets/images/logo-bora-cuiaba.png"
              alt="logo"
            />
          </Link>
        </FlexBox>

        <FlexBox justifyContent="center" flex="1 1 0">
          <H1></H1>
        </FlexBox>

        <FlexBox className="header-right" alignItems="center">
          {(!isAuthenticated(session) || false) && (
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
          {(isAuthenticated(session) || false) && (
            <IconButton
              onClick={() => router.push(APP_ROUTES.AUTH.LOGIN)}
              ml="1rem"
              bg="gray.200"
              p="8px"
            >
              <Icon size="28px">user</Icon>
            </IconButton>
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
