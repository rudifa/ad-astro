import { defineConfig } from 'astro/config';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import netlify from '@astrojs/netlify';
// import vercel from '@astrojs/vercel/static'; // Commented out since we are using Netlify

// https://astro.build/config
export default defineConfig({
  output: 'server', // Use 'server' for Netlify
  adapter: netlify(), // Use Netlify adapter
  integrations: [],
  vite: {
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: 'node_modules/@shoelace-style/shoelace/dist/assets/**/*',
            dest: './shoelace/assets',
          },
        ],
      }),
    ],
  },
});
