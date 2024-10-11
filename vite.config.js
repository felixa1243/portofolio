import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: ".", // Root directory (where your index.html is located)
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "index.html",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./js"),
    },
  },
});
