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
import {
  useSession,
  useSupabaseContext,
} from "@supabaseutils/supabase.provider";
import Box from "@component/Box";
import styled from "styled-components";
import { isValidProp } from "@utils/utils";
import { useLaraTheme } from "@context/app-context/AppContext";
import ObjectUtils from "@utils/helpers/Object.utils";
import SessionUtils from "@supabaseutils/session";

export default function DashboardNavigation() {
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
  const theme = useLaraTheme();
  const pathname = usePathname();
  const { tenant } = useSession();
  const context = useSupabaseContext();

  const ScrollBox = styled.div.withConfig({
    shouldForwardProp: (prop) => isValidProp(prop),
  })`
    width: 270px;
    position: fixed;
    background-color: white;

    overflow-x: hidden;
    overflow-y: scroll;
    max-height: calc(100vh - 64px);

    /* ===== Scrollbar CSS ===== */
    /* Firefox */
    // scrollbar-width: 10px;
    // scrollbar-color: ${theme.colors.primary.main} ${theme.colors.primary
      .light};

    /* Scrollbar Styling */
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background-color: ${theme.colors.gray[500]};
      -webkit-border-radius: 10px;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      -webkit-border-radius: 10px;
      border-radius: 10px;
      background: ${theme.colors.primary[400]};
    }
  `;

  return (
    <ScrollBox>
      <Box>
        <Typography p="26px 30px 1rem" color="text.muted" fontSize="12px">
          {}
        </Typography>

        <StyledDashboardNav
          px="1.5rem"
          mb="1rem"
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
              color="primary"
              fontSize="1rem"
              style={{
                borderBottom: "1px solid",
              }}
            >
              {(tenant && tenant?.name) || "Criar Loja"}
            </SemiSpan>
          </FlexBox>

          {/* <span>{item?.count}</span> */}
        </StyledDashboardNav>
        {linkList?.map(
          (item) =>
            item?.title &&
            validateRules(
              item.rules,
              { tenant: tenant },
              context?.auth.session
            ) && (
              <Fragment key={item.title}>
                <Typography
                  p="26px 30px 1rem"
                  color="text.muted"
                  fontSize="12px"
                >
                  {item.title}
                </Typography>

                {item?.list?.map(
                  (item) =>
                    validateRules(
                      item.rules,
                      { tenant: tenant },
                      context?.auth.session
                    ) && (
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
                    )
                )}
              </Fragment>
            )
        )}
        <FlexBox
          alignItems="center"
          flexDirection="column"
          justifyContent="space-between"
          mb="2rem"
        >
          <Divider width="225px" my="1rem" bg="primary.main" height="2px" />
          <LogoutButton />
        </FlexBox>
      </Box>
    </ScrollBox>
  );
}

interface RulesProps {
  tenantRequired: boolean;
  tenantType: string | null;
  adminOnly: boolean;
  onlyWithStore: boolean;
}

interface RulesParamProps {
  tenant?: any;
}

const defaultRules: RulesProps = {
  tenantRequired: false,
  tenantType: null,
  adminOnly: false,
  onlyWithStore: false,
};

const validateRules = (
  rules: RulesProps,
  params: RulesParamProps,
  session?: SessionUtils
) => {
  let canGet = true;
  if (canGet && rules?.tenantRequired) {
    canGet = ObjectUtils.nonNull(params.tenant?.id);
  }
  if (canGet && ObjectUtils.nonNull(rules?.tenantType)) {
    canGet = rules.tenantType == params.tenant?.type;
  }
  if (canGet && rules?.adminOnly == true) {
    canGet = session?.isAdmin() == true;
  }
  if (canGet && rules?.onlyWithStore == true) {
    canGet = session?.tenantStore() == true;
  }
  return canGet;
};

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
    rules: { ...defaultRules, onlyWithStore: true },
    title: "VENDAS",
    list: [
      {
        href: APP_ROUTES.DASHBOARD.DELIVERY_DASHBOARD,
        title: "Painel de Pedidos",
        iconName: "robot",
      },
      {
        href: APP_ROUTES.DASHBOARD.SALES.HISTORY,
        title: "Histórico de Vendas/Pedidos",
        iconName: "fa/solid/list-check",
      },
      {
        href: APP_ROUTES.DASHBOARD.SALES.NEW,
        title: "Novo Pedido/Venda",
        iconName: "plus",
      },
    ],
  },

  process.env.APP_STORE_CONTEXT_REQUIRED == "true" && {
    rules: { ...defaultRules, onlyWithStore: true },
    title: "MEUS PRODUTOS",
    list: [
      {
        href: APP_ROUTES.DASHBOARD.MY_CATALOG + "?start=true",
        title: "Gerenciar Produtos",
        iconName: "fa/solid/boxes-stacked",
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
        rules: { ...defaultRules, tenantRequired: true, tenantType: "store" },
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
        rules: { ...defaultRules, tenantRequired: true, tenantType: "store" },
        href: APP_ROUTES.DASHBOARD.STORE.BUSINESS_HOURS,
        title: "Horário de Funcionamento",
        iconName: "clock-circular-outline",
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
    rules: {
      ...defaultRules,
      adminOnly: true,
    },
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
  {
    rules: {
      ...defaultRules,
    },
    title: "SUPORTE",
    list: [
      {
        href: APP_ROUTES.SUPORT_CENTER.LIST,
        title: "Cards",
        iconName: "fa/solid/dumpster-fire",
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
