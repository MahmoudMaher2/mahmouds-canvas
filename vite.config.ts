import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        summaries: path.resolve(__dirname, "summaries.html"),
      },
      output: {
        manualChunks: {
          // React core — cached forever after first load
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          // Radix + shadcn UI components
          "vendor-ui": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-slot",
            "@radix-ui/react-toast",
            "@radix-ui/react-tooltip",
          ],
          // Heavy Lottie player (only used in Summaries)
          "vendor-lottie": ["@lottiefiles/react-lottie-player"],
          // Lucide icons
          "vendor-icons": ["lucide-react"],
        },
      },
    },
  },
});

