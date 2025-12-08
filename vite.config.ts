//=================
// For Shadcn
import path from "path";
import tailwindcss from "@tailwindcss/vite";
//=================

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import basicSsl from "@vitejs/plugin-basic-ssl";
// import mkcert from "vite-plugin-mkcert";

import svgr from "vite-plugin-svgr";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // basicSsl(),
    // mkcert(), // Add the mkcert plugin here

    // for Shadcn
    tailwindcss(),

    svgr({
      svgrOptions: {
        icon: true,
        // This will transform your SVG to a React component
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),

    // your other plugins...
    visualizer({
      filename: "dist/stats.html",
      open: true,
    }),
  ],

  // For Shadcn
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // server: {
  //   // https: true,
  //   port: 5173,
  // },

  // server: {
  //   "/api": {
  //     target: "https://helpdesk-dev.fmis.gov.kh:448",
  //     changeOrigin: true,
  //     secure: true,
  //     rewrite: (path) => path.replace(/^\/api/, "/api/v1"),
  //   },
  // },
});
