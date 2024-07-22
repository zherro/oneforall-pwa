"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";

import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import APP_ROUTES from "@routes/app.routes";
import LogoutButton from "@sections/auth/Logout";
// STYLED COMPONENTS
import { DashboardNavigationWrapper, StyledDashboardNav } from "./styles";
import Divider from "../Divider";
import Box from "../Box";

export default function DashboardNavigation() {
  const pathname = usePathname();

  return (
    <DashboardNavigationWrapper
      px="0px"
      pb="1.5rem"
      color="gray.900"
      borderRadius={8}
    >
      <DashboardNavigationMenu />
    </DashboardNavigationWrapper>
  );
}

export function DashboardNavigationMenu() {
  const pathname = usePathname();

  return (
    <>
      {linkList.map((item) => (
        <Fragment key={item.title}>
          <Typography p="26px 30px 1rem" color="text.muted" fontSize="12px">
            {item.title}
          </Typography>

          {item.list.map((item) => (
            <StyledDashboardNav
              px="1.5rem"
              mb="1.25rem"
              href={item.href}
              key={item.title}
              isCurrentPath={pathname?.includes(item.href)}
            >
              <FlexBox alignItems="center">
                <div className="dashboard-nav-icon-holder">
                  <Icon variant="small" defaultcolor="currentColor" mr="10px">
                    {item.iconName}
                  </Icon>
                </div>

                <span>{item.title}</span>
              </FlexBox>

              <span>{item.count}</span>
            </StyledDashboardNav>
          ))}
        </Fragment>
      ))}
      <StyledDashboardNav px="1.5rem" mb="1.25rem" href="#">
        <Box alignItems="center">
          <Divider width="175px" my="1rem" bg="primary.main" height="2px" />
          <LogoutButton />
        </Box>
      </StyledDashboardNav>
    </>
  );
}

const linkList = [
  {
    title: "Links Rapidos",
    list: [
      {
        href: "/",
        title: "Ir para o site",
        iconName: "home",
      },
    ],
  },
  {
    title: "DASHBOARD",
    list: [
      {
        href: APP_ROUTES.DASHBOARD.CATEGORY_LIST,
        title: "Categorias",
        iconName: "box",
        count: 0,
      },
      {
        href: APP_ROUTES.DASHBOARD.CATEGORY_NEW,
        title: "Nova Categoria",
        iconName: "plus",
        count: 0,
      },
      {
        href: APP_ROUTES.DASHBOARD.POST_LIST,
        title: "Publicações",
        iconName: "box",
        count: 0,
      },
      {
        href: APP_ROUTES.DASHBOARD.POST_SELECT_TYPE,
        title: "Nova Publicação",
        iconName: "fa/regular/newspaper",
        count: 0,
      },
      // { href: "/orders", title: "Orders", iconName: "bag", count: 5 },
      // { href: "/wish-list", title: "Wishlist", iconName: "heart", count: 19 },
      // {
      //   href: "/support-tickets",
      //   title: "Support Tickets",
      //   iconName: "customer-service",
      //   count: 1,
      // },
    ],
  },
  // {
  //   title: "ACCOUNT SETTINGS",
  //   list: [
  //     { href: "/profile", title: "Profile Info", iconName: "user", count: 3 },
  //     { href: "/address", title: "Addresses", iconName: "pin", count: 16 },
  //     {
  //       href: "/payment-methods",
  //       title: "Payment Methods",
  //       iconName: "credit-card",
  //       count: 4,
  //     },
  //   ],
  // },
];
