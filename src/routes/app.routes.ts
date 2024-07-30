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
    PROFILE: "/profile",
    PROFILE_DATA: "/profile/data",
    PROFILE_CONFIGURE: "/profile-configure",
    PROFILE_SELECT_COMPANY: "/profile/select-store",
  },
  SUPORT: {
    FORM: "/suporte",
  },

  DASHBOARD: {
    HOME: dashboard,
    PROFILE: `${dashboard}/profile`,
    STORE: {
      MY_STORE: `${dashboard}/stores/minha-loja`,
      NEW_STORE: `${dashboard}/stores/nova-loja`,
    },
    MY_CATALOG: `${dashboard}/cardapio`,
    MY_CATALOG_SEND_FILE_CARDAPIO: `${dashboard}/cardapio/cardapio-enviar`,

    CATEGORY_NEW: `${dashboard}/new-category`,
  },

  ADMIN: {
    USERS: `${dashboard}/admin/users`,
    USERS_PERMISSION: `${dashboard}/admin/users-permissions`,
    CONFIG_PRODUCTS_TABLE: `${dashboard}/admin/config-products`,
    CONFIG_PRODUCTS_TABLE_FORM: `${dashboard}/admin/config-products/form`,
  },
};

export const API_ROUTES = {
  TICKETS: "/api/tickets",
  BUKET: {
    GET: "/api/bucket",
  },
  USER: {
    CONFIRM_EMAIL: "/api/confirm-email",
    PROFILE_CONFIGURE: "/api/profile-configure",
  },
  CUSTOMER: {
    CATEGORY: "/api/customer/category",
    POST: "/api/customer/article",

    CATALOG: {
      SEND_CATALOG_FILE: "/api/catalog/upload-menu"
    }
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
    LIST: "/api/stores",
    NEW: "/api/stores",
  },

  TENANT: {
    CHANGE: "/api/tenant/change",
  },

  ADMIN: {
    USERS: "/api/admin/profiles",
    CONFIG_PRODUCT_TABLE: "/api/admin/config-products-table",
  },
};

export default APP_ROUTES;
