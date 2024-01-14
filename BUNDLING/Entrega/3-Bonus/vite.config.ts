import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import react from "@vitejs/plugin-react";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  plugins: [checker({ typescript: true, overlay: false }), react()],
  build: {
    modulePreload: {
      polyfill: false,
    },
    sourcemap: true,
    rollupOptions: {
      plugins: [typescript({ tsconfig: "tsconfig.json" })],
    },
  },
});