import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pages serves project sites beneath /<repository-name>/.
  base: process.env.GITHUB_ACTIONS ? '/serve-on-server/' : '/',
  server: { proxy: { '/api': 'http://localhost:3000' } },
});
