import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

export default defineConfig({
  build: {
    outDir: "dist",           // Netlify default publish dir
    chunkSizeWarningLimit: 2000,
    sourcemap: true           // optional, as per your package.json build
  },
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    port: 4028,               // number, not string
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: 'all'       // safe for Netlify
  }
});
