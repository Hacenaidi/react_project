import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5005",
        changeOrigin: true,
      },
      "/public": {
        target: "http://localhost:5005",
        changeOrigin: true,
      },
    },
  },
  plugins: [TanStackRouterVite() ,react()],
})