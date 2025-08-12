import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // base: './' ensures that all asset paths in the built HTML are relative.
  // This is crucial for deployments where the site is not at the root of the domain,
  // such as GitHub Pages or some S3 configurations.
  base: './',
});
