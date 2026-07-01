import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // Vercel handles the base path automatically, so we defaults it to "/"
  base: "/",
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Keeping your attached assets alias pointing to your local folder
      "@assets": path.resolve(__dirname, "./public"), 
    },
    dedupe: ["react", "react-dom"],
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
  },
});
