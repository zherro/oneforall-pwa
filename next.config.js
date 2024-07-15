/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});

/** @type {import('next').NextConfig} */

const removeImports = require("next-remove-imports")();
// module.exports = removeImports({});

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
    APP_NAME: "bony-clyde",
    TRACE_MODE: "on",
    NEXT_PUBLIC_SUPABASE_URL: "http://localhost:8000",
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE",

    APP_LANGUAGE: "portuguese", // portuguese, english

    S3_BUKET_NAME: "gathu-cuiaba",
    S3_BUKET_URI:
      "https://boracuiaba.nyc3.cdn.digitaloceanspaces.com/gathu-cuiaba/",
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
