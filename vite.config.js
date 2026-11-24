import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// public/assets holds the design kit (system.css, system.js, ui, motion, effects, moments) as plain files,
// loaded at runtime from /assets/...; Vite's own bundle goes to /_app so the two never collide.
export default defineConfig({
  plugins: [react()],
  build: { assetsDir: "_app" },
});
