// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()],

  // Configuración de rutas
  routes: [
    {
      pattern: '/blog',
      prerender: true
    },
    {
      pattern: '/blog/[slug]',
      prerender: true
    },
    {
      pattern: '/[slug]',
      prerender: true
    }
  ]
});
