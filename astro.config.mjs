import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  experimental: {
    svgo: true
  },
  vite: {
    resolve: {
      // Vite 8 + Rolldown: required or CSS pipeline throws Missing field `tsconfigPaths`
      tsconfigPaths: true,
      // `@/*` tsconfig paths must not steal `@tailwindcss/*` from global.css @plugin() strings
      alias: {
        "@tailwindcss/typography": path.resolve(
          __dirname,
          "node_modules/@tailwindcss/typography",
        ),
        "@tailwindcss/forms": path.resolve(
          __dirname,
          "node_modules/@tailwindcss/forms",
        ),
        "tailwind-scrollbar-hide": path.resolve(
          __dirname,
          "node_modules/tailwind-scrollbar-hide",
        ),
      },
    },
    plugins: [tailwindcss()],
  },
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: "css-variables",
    },
  },
  shikiConfig: {
    wrap: true,
    skipInline: false,
    drafts: true,
  },
  site: "https://uicollective.org",
  integrations: [sitemap(), mdx()],
});
