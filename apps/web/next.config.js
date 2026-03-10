const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* next-pwa uses webpack; Next.js 16 defaults to Turbopack so we opt into webpack */
  turbopack: {},
};

module.exports = withPWA(nextConfig);
