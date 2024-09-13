const dashboard = "/minhaconta";

const APP_ROUTES = {
  CONTACT_US: "/contato",
  CONTACT_RECEIVED: "/contato/recebido",
  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
    RECOVERY: "/recovery",
  },
  USER: {
    PROFILE_OBBOARD: "/profile/onboard",
    PROFILE: "/profile",
    PROFILE_DATA: "/profile/data",
    PROFILE_CONFIGURE: "/profile-configure",
    PROFILE_SELECT_COMPANY: "/profile/select-store",
  },
  SUPORT: {
    FORM: "/suporte",
  },
  SUPORT_CENTER: {
    LIST: "/suporte-center",
  },

  DASHBOARD: {
    WELCOME: `/welcome-back`,
    HOME: dashboard,
    PROFILE: `${dashboard}/profile`,
    STORE: {
      MY_STORE: `${dashboard}/stores/minha-loja`,
      NEW_STORE: `${dashboard}/stores/nova-loja`,
      BUSINESS_HOURS: `${dashboard}/stores/business-hour`,
    },
    MY_CATALOG: `${dashboard}/cardapio`,
    MY_CATALOG_SEND_FILE_CARDAPIO: `${dashboard}/cardapio/cardapio-enviar`,

    CATEGORY_NEW: `${dashboard}/cardapio/new-category`,
    PRODUCT_NEW: `${dashboard}/cardapio/new-product`,

    DELIVERY_DASHBOARD: `${dashboard}/pedidos`,
    SALES: {
      NEW: `${dashboard}/sales/nova-venda`,
      HISTORY: `${dashboard}/sales/history`,
    },
  },

  ADMIN: {
    USERS: `${dashboard}/admin/users`,
    USERS_PERMISSION: `${dashboard}/admin/users-permissions`,
    CONFIG_PRODUCTS_TABLE: `${dashboard}/admin/config-products`,
    CONFIG_PRODUCTS_TABLE_FORM: `${dashboard}/admin/config-products/form`,
  },
};

export const API_ROUTES = {
  PLAN: {
    FREE: "/api/plan/free",
  },
  SUPORT_CENTER: {
    TICKETS_ALL: "/api/suport-center",
  },
  BUKET: {
    GET: "/api/bucket",
  },
  USER: {
    CONFIRM_EMAIL: "/api/confirm-email",
    PROFILE_CONFIGURE: "/api/profile-configure",
    GET_MY_PROFILE: "/api/users",
    PROFILE_ONBOARD: "/api/users/onboard",
  },
  CUSTOMER: {
    CATALOG: {
      MY_CARDAPIO: "/api/catalog/cardapio",
      PRODUCT: "/api/catalog/product",
      CATEGORY: "/api/catalog/category",
      CATEGORY_CHANGE_STATUS: "/api/catalog/category/change/status",
      SEND_CATALOG_FILE: "/api/catalog/upload-menu",
    },
  },
  EVENTOS: {
    NEXT: "/api/events/next",
  },
  PUBLIC: {
    ARTICLES: "/api/articles",
    PAGES: "/api/pages/",
    PLACES: "/api/places",
  },

  STORE: {
    MY_STORES: "/api/stores/my-stores",
    NEW: "/api/stores/my-stores",
    UPDATE_BUSSINES_HOURS: "/api/stores/my-stores/update-bussines-hours",
  },

  TENANT: {
    CHANGE: "/api/tenant/change",
  },

  ADMIN: {
    USERS: "/api/admin/profiles",
    CONFIG_PRODUCT_TABLE: "/api/admin/config-products-table",
  },

  CATALOG: {
    PRODUCT_SEARCH: "/api/catalog/search",
    EXIST_CATALOG_FOR_TENANT: "/api/catalog/exists-by-tenant",
  },
};

export default APP_ROUTES;
