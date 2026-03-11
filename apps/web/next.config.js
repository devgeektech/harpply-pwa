const path = require("path");

// Resolve next-pwa from this app's node_modules (avoids MODULE_NOT_FOUND when run via Turbo from monorepo root)
const withPWA = require(require.resolve("next-pwa", { paths: [__dirname] }))({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* next-pwa uses webpack */
  turbopack: {
    root: path.join(__dirname, "../.."),
  },

  outputFileTracingRoot: path.join(__dirname, "../.."),

  // Fix for cross-origin dev warning
  allowedDevOrigins: [
    "www.harpply.com",
    "harpply.com",
    "localhost",
  ],
};

module.exports = withPWA(nextConfig);
