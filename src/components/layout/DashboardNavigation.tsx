"use client";
import { Fragment } from "react";
import { usePathname } from "next/navigation";

import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import Typography, { SemiSpan } from "@component/Typography";
import APP_ROUTES from "@routes/app.routes";
import LogoutButton from "@sections/auth/Logout";
// STYLED COMPONENTS
import { DashboardNavigationWrapper, StyledDashboardNav } from "./styles";
import Divider from "../Divider";
import { useSession } from "@supabaseutils/supabase.provider";

export default function DashboardNavigation() {
  const pathname = usePathname();

  return (
    <DashboardNavigationWrapper
      px="0px"
      pb="1.5rem"
      color="gray.900"
      borderRight="1px solid #cdcdcd"
    >
      <DashboardNavigationMenu />
    </DashboardNavigationWrapper>
  );
}

export function DashboardNavigationMenu() {
  const pathname = usePathname();
  const { tenant } = useSession();

  return (
    <>
      <Typography p="26px 30px 1rem" color="text.muted" fontSize="12px">
        {}
      </Typography>

      <StyledDashboardNav
        px="1.5rem"
        mb="1.25rem"
        href={APP_ROUTES.DASHBOARD.STORE.MY_STORE}
      >
        <FlexBox alignItems="center" color="primary.main">
          <div className="dashboard-nav-icon-holder">
            <Icon variant="small" defaultcolor="primary.main" mr="10px">
              store-solid
            </Icon>
          </div>

          <SemiSpan
            borderColor="gray.200"
            style={{
              borderBottom: "1px solid",
            }}
          >
            {tenant?.name}
          </SemiSpan>
        </FlexBox>

        {/* <span>{item?.count}</span> */}
      </StyledDashboardNav>
      {linkList?.map(
        (item) =>
          item?.title && (
            <Fragment key={item.title}>
              <Typography p="26px 30px 1rem" color="text.muted" fontSize="12px">
                {item.title}
              </Typography>

              {item?.list?.map((item) => (
                <StyledDashboardNav
                  px="1.5rem"
                  mb="1.25rem"
                  href={item.href}
                  key={item.title}
                  isCurrentPath={pathname?.includes(item.href)}
                >
                  <FlexBox alignItems="center">
                    <div className="dashboard-nav-icon-holder">
                      <Icon
                        variant="small"
                        defaultcolor="currentColor"
                        mr="10px"
                      >
                        {item.iconName}
                      </Icon>
                    </div>

                    <span>{item.title}</span>
                  </FlexBox>

                  <span>{item?.count}</span>
                </StyledDashboardNav>
              ))}
            </Fragment>
          )
      )}
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
    title: "VENDAS",
    list: [
      {
        href: APP_ROUTES.DASHBOARD.DELIVERY_DASHBOARD,
        title: "Painel de Pedidos",
        iconName: "robot",
      },
      {
        href: APP_ROUTES.DASHBOARD.SALES.NEW,
        title: "Novo Pedido/Venda",
        iconName: "plus",
      },
    ],
  },

  process.env.APP_STORE_CONTEXT_REQUIRED == "true" && {
    title: "MEU NEGÓCIO",
    list: [
      {
        href: APP_ROUTES.DASHBOARD.STORE.MY_STORE,
        title: "Minha Loja",
        iconName: "store-solid",
      },
      {
        href: APP_ROUTES.DASHBOARD.STORE.MY_STORE + "?change=true",
        title: "Gerenciar Outra Loja",
        iconName: "fa/solid/arrows-rotate",
      },
      {
        href: APP_ROUTES.DASHBOARD.STORE.NEW_STORE,
        title: "Nova Loja",
        iconName: "plus",
      },
      {
        href: APP_ROUTES.DASHBOARD.STORE.BUSINESS_HOURS,
        title: "Horário de Funcionamento",
        iconName: "clock-circular-outline",
      },
    ],
  },

  process.env.APP_STORE_CONTEXT_REQUIRED == "true" && {
    title: "MEUS PRODUTOS",
    list: [
      {
        href: APP_ROUTES.DASHBOARD.MY_CATALOG,
        title: "Gerenciar Produtos",
        iconName: "fa/solid/boxes-stacked",
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
      {
        href: APP_ROUTES.ADMIN.CONFIG_PRODUCTS_TABLE,
        title: "Tabela de Produtos",
        iconName: "fa/regular/rectangle-list",
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
