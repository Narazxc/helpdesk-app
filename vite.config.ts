//=================
// For Shadcn
import path from "path";
import tailwindcss from "@tailwindcss/vite";
//=================

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),

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
});
