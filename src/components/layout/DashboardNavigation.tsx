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

              <span>{item?.count}</span>
            </StyledDashboardNav>
          ))}
        </Fragment>
      ))}
      <FlexBox
        alignItems="center"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Divider width="225px" my="1rem" bg="primary.main" height="2px" />
        <LogoutButton />
      </FlexBox>
    </>
  );
}

const linkList = [
  {
    title: "Links Rapidos",
    list: [
      {
        href: APP_ROUTES.DASHBOARD.HOME,
        title: "Ir para a Home",
        iconName: "home",
      },
    ],
  },
  {
    title: "CONFIGURAÇÃO DA CONTA",
    list: [
      {
        href: APP_ROUTES.DASHBOARD.PROFILE,
        title: "Minha Conta",
        iconName: "user",
      },
      {
        href: "#",
        title: "Meu Endereço",
        iconName: "map-pin-2",
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
  {
    title: "ADMINISTRADOR",
    list: [
      {
        href: APP_ROUTES.ADMIN.USERS,
        title: "Usuários",
        iconName: "children",
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
];
