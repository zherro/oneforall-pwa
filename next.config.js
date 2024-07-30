/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});

/** @type {import('next').NextConfig} */

const removeImports = require("next-remove-imports")();
// module.exports = removeImports({});

const dev = {
  app_url: "http://localhost:3000",
  api_url: "http://localhost:8000",
};

const prod = {
  app_url: "https://bimoapp.boracuiaba.com",
  api_url: "https://bimoapp.boracuiaba.com:8881",
};

const envDefault = dev;
// const envDefault = prod;

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyimage.com",
      },
      {
        protocol: "https",
        hostname: "boracuiaba.nyc3.cdn.digitaloceanspaces.com",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  publicRuntimeConfig: {
    // Available on both server and client
    theme: "DEFAULT",
  },
  env: {
    // APP CONFIG
    SITE_URI: envDefault.app_url,
    APP_META_TITLE: "Bimo App",
    APP_NAME: "Bimo App",
    APP_LANGUAGE: "portuguese", // portuguese, english

    // STORE
    APP_STORE_CONTEXT_REQUIRED: "true",

    APP_EMAIL_SUPORT: "contato@boracuiaba.com",
    APP_INSTAGRAN_NAME: "@boracuiaba.ofc",
    APP_INSTAGRAN_LINK: "https://www.instagram.com/boracuiaba.ofc",

    // AUTH
    APP_AUTH_IF_AUTHENTICATED_REDIRECT_TO: "/minhaconta",
    APP_AUTH_IF_AUTHENTICATED_DONT_USE_ROUTES: "/login,/signup",

    APP_REDIRECT_AFTERPROFILE_COMPLETED: "/select-plan",

    // trace log mode
    TRACE_MODE: "on", // on, off

    // SUPABASE
    NEXT_PUBLIC_SUPABASE_URL: `http://localhost:8000`,
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE",

    // EMAIL SENDER
    EMAIL_USER: "one.4.all.bmo@gmail.com",
    EMAIL_PASS: "hobhmejwmfditwme",

    // S3 BUCKET
    S3_BUKET_NAME: "bimo-buket",
    S3_BUKET_URI:
      "https://boracuiaba.nyc3.cdn.digitaloceanspaces.com/bimo-buket/",

    // GOOGLE
    G_CAPTCHA_SITE_KEY: "6LfUSAIqAAAAAN8fUYn8TRvHS2d6vCdKAOyacvKF",
  },
  // !! WARN !!
  // Dangerously allow production builds to successfully complete even if
  // your project has type errors.
  // !! WARN !!
  ignoreBuildErrors: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Vary",
            value: "Accept-Encoding, Accept",
          },
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        ],
      },
    ];
  },
  // swcMinify: true,      // Enable SWC minification for improved performance
  // pwa: {
  //   dest: "public",
  //   disable: false,
  // },
};

// next.config.js
// const withPWA = require("@ducanh2912/next-pwa").default({
//   // disable: process.env.NODE_ENV === "development", // Disable PWA in development mode

//   dest: "public",
//   register: true,
//   skipWaiting: true,
// });
// // export default nextConfig;

module.exports = withPWA(removeImports(nextConfig));
