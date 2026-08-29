import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // React — always in initial bundle
            if (
              id.includes('/react-dom/') ||
              (id.includes('/react/') && !id.includes('react-icons') && !id.includes('react-intersection'))
            ) {
              return 'vendor-react';
            }

            // framer-motion: return undefined so Rollup co-locates it with its
            // lazy-loading consumer chunks (About, Gallery, etc.).
            // This removes 132 KB from the initial page load.
            if (id.includes('framer-motion')) {
              return undefined;
            }

            // gsap: kept as its own deferred chunk. Hero/Preloader use
            // dynamic import so this only downloads after first user interaction
            // or when GSAP animations start.
            if (id.includes('gsap')) {
              return 'vendor-gsap';
            }

            // lenis: dynamic import in useLenis — never in initial bundle on mobile
            if (id.includes('lenis')) {
              return 'vendor-lenis';
            }

            if (id.includes('lucide-react') || id.includes('react-icons')) {
              return 'vendor-icons';
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
