import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  // @repo/ui is consumed from source; pnpm can put a different react patch under
  // packages/ui than under apps/admin, which triggers "Invalid hook call" at runtime.
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: {
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  plugins: [react()],
  server: {
    host: true,
    port: 3002,
    allowedHosts: ["admin.harpply.com"],
  },
});
