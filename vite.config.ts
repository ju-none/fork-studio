import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  base: "/",
  plugins: [react(), imagetools()],
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@weshre": path.resolve(__dirname, "../weshre/src"),
    },
  },
  define: {
    "process.env": {},
  },
  server: {
    port: 5174,
  },
});
