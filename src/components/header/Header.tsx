"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import Box from "@component/Box";
import Image from "@component/Image";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import Container from "@component/Container";
import { Tiny } from "@component/Typography";
import { IconButton } from "@component/buttons";
import Categories from "@component/categories/Categories";
import { SearchInput } from "@component/search-box";
import { useAppContext } from "@context/app-context";
import StyledHeader from "./styles";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import APP_ROUTES from "@routes/app.routes";
import styled from "styled-components";
import { isValidProp } from "@utils/utils";
import StringUtils from "@utils/string";

// ====================================================================
type HeaderProps = { isFixed?: boolean; className?: string };
// =====================================================================

// STYLED COMPONENTS
const BoxImg = styled.div.withConfig({
  shouldForwardProp: (prop) => isValidProp(prop),
})`
  img {
    max-width: 120px;
  }
  @media only screen and (max-width: 525px) {
    img {
      max-width: 100px !important;
    }
  }
  @media only screen and (max-width: 525px) {
    img {
      max-width: 100px !important;
    }
  }
  @media only screen and (max-width: 425px) {
    img {
      max-width: 80px !important;
    }
  }
`;

const concatQuery = (param, name, query): string => {
  const prefix = StringUtils.isEmptyString(query) ? "?" : "&";
  return StringUtils.notBlankString(param)
    ? `${query}${prefix}${name}=${param}`
    : query;
};

export default function Header({ isFixed, className }: HeaderProps) {
  const { state } = useAppContext();
  const [open, setOpen] = useState(false);
  const toggleSidenav = () => setOpen(!open);
  const router = useRouter();

  const searchParams = useSearchParams();
  const path = usePathname();

  const getQuery = useCallback(
    (queryText) => {
      let query = concatQuery(
        searchParams.get("category"),
        "category",
        queryText
      );
      query = concatQuery(
        searchParams.get("fixed_category"),
        "fixed_category",
        query
      );
      console.log("query", query);
      console.log("path", path);
      console.log("searchParams", searchParams);
      return query;
    },
    [path, searchParams]
  );

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
        <FlexBox alignItems="center" mr="1rem">
          <Link href="/">
            <BoxImg>
              <Image src="/assets/images/logo-bora-cuiaba.png" alt="logo" />
            </BoxImg>
          </Link>

          {isFixed && (
            <div className="category-holder">
              <Categories>
                <FlexBox color="text.hint" alignItems="center" ml="1rem">
                  <Icon>categories</Icon>
                  <Icon>arrow-down-filled</Icon>
                </FlexBox>
              </Categories>
            </div>
          )}
        </FlexBox>

        <FlexBox justifyContent="center" flex="1 1 0">
          {/* <SearchInputWithCategory /> */}
          <SearchInput
            onSearch={(query) =>
              query
                ? router.push(`/busca${getQuery(`?query=${query}`)}`)
                : router.push(`/busca${getQuery("")}`)
            }
          />
        </FlexBox>

        <FlexBox className="header-right" alignItems="center">
          {/* <IconButton
            onClick={() => router.push(APP_ROUTES.AUTH.LOGIN)}
            ml="1rem"
            bg="gray.200"
            p="8px"
          >
            <Icon size="28px">user</Icon>
          </IconButton> */}
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
