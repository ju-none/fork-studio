import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: '/',
  plugins: [react()],
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
  }
});
