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

  DASHBOARD: {
    HOME: dashboard,
    PROFILE: `${dashboard}/profile`
  },
};

export const API_ROUTES = {
  TICKETS: "/api/ticket",
  BUKET: {
    GET: "/api/bucket",
  },
  USER: {
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
};

export default APP_ROUTES;
