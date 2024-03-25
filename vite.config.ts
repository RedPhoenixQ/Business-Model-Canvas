import path from "path";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { viteSingleFile } from "vite-plugin-singlefile";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "inline",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        inlineWorkboxRuntime: true,
      },
      scope: "/Business-Model-Canvas/",
      manifest: {
        name: "Business Model Canvas",
        short_name: "BMC",
        scope: "/Business-Model-Canvas/",
        start_url: "/Business-Model-Canvas/",
        description: "An interactive Business Model Canvas",
        theme_color: "#2c2c2c",
        icons: [
          {
            src: "data:image/png;base64,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",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "data:image/png;base64,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",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
    viteSingleFile({
      removeViteModuleLoader: true,
    }),
  ],
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
    },
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
});
