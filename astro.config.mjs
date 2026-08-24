import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://ogelin.github.io',
  base: '/site',
  outDir: './dist/site',
  integrations: [mdx()],
  markdown: {
    shikiConfig: { theme: 'github-dark-default', wrap: true },
  },
});
