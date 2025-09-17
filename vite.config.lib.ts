import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "IntroStorybookReactTemplate",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.mjs" : "index.cjs"),
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
      output: {
        globals: { react: "React", "react-dom": "ReactDOM" },
        assetFileNames: (assetInfo) => {
          return assetInfo.name && assetInfo.name.endsWith(".css")
            ? "style.css"
            : "assets/[name][extname]";
        },
      },
    },
    outDir: "dist-lib",
    emptyOutDir: true,
    sourcemap: true,
    cssCodeSplit: false,
    minify: true,
  },
  resolve: {
    alias: { "~": "/src" },
  },
});
