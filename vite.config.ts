import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
import copy from "rollup-plugin-copy";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
      copy({
        targets: [{ src: "public/manifest.json", dest: "dist" },
          { src: "public/icons", dest: "dist" } 
        ], // Ensure manifest.json is copied
        hook: "writeBundle",
      }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: __dirname,
  envDir: ".",
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
});
