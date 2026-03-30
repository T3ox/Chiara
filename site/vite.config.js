import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    // Code splitting: separa vendor (react, react-dom) dal codice app
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },

    // Soglia avviso per chunk troppo grandi (in KB)
    chunkSizeWarningLimit: 500,

    // Abilita source map per debug in produzione (opzionale, utile per Lighthouse)
    sourcemap: false,

    // Minifica con esbuild (default, più veloce di terser)
    minify: "esbuild",

    // Inline asset piccoli (< 4KB) come base64 per ridurre richieste HTTP
    assetsInlineLimit: 4096,

    // Nomi file con hash per cache busting (implicito in Vite, lo rendiamo esplicito)
    assetsDir: "assets",
  },

  // Header di cache per il dev server (in produzione dipendono dal hosting)
  server: {
    headers: {
      // Asset con hash nel nome: cache lunga
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  },
});
