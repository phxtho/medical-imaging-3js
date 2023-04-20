import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "//medical-imaging-3js/", // to use gh-pages
  assetsInclude: ["**/*.dcm"],
});
