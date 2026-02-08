import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false, // Disable source maps in production
    minify: "esbuild", // Use esbuild instead of terser (faster and no extra dependency)
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": ["bootstrap", "react-datepicker", "date-fns"],
        },
      },
    },
  },
});
