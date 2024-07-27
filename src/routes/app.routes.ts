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
  },

  ADMIN: {
    USERS: `${dashboard}/admin/users`,
    USERS_PERMISSION: `${dashboard}/admin/users-permissions`,
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
    CHANGE: "/api/tenant/change"
  },

  ADMIN: {
    USERS: "/api/admin/profiles",
  },
};

export default APP_ROUTES;
