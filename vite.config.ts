import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';

const IMAGE_PRESETS: Record<string, string> = {
  hero: '480;768;1280;1920',
  card: '360;540;720',
  portrait: '240;480',
  gallery: '480;960',
};

const BUILD_DATE = new Date().toISOString().slice(0, 10);

export default defineConfig({
  define: {
    __BUILD_DATE__: JSON.stringify(BUILD_DATE),
  },
  plugins: [
    react(),
    tailwindcss(),
    imagetools({
      defaultDirectives: (url) => {
        const widths = IMAGE_PRESETS[url.searchParams.get('preset') ?? ''];
        if (widths === undefined) return new URLSearchParams();
        return new URLSearchParams({ w: widths, format: 'avif;webp;jpg', as: 'picture' });
      },
    }),
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    sourcemap: false,
    // Fontes nunca viram data: URI (a CSP permite apenas font-src 'self').
    assetsInlineLimit: (file) => (file.endsWith('.woff2') ? false : undefined),
    manifest: true,
  },
});
