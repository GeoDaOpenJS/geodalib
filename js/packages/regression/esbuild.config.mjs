import { dtsPlugin } from 'esbuild-plugin-d.ts';
import { createBaseConfig, buildFormat } from '../../esbuild.config.mjs';

const baseConfig = createBaseConfig({
  target: ['es2020'],
  mainFields: ['module', 'main'],
  external: ['fs', 'path'],
  entryPoints: ['src/index.ts'],
  plugins: [dtsPlugin()],
});

// Build all formats
Promise.all([buildFormat(baseConfig, 'esm', 'dist/index.js')]).catch(error => {
  console.error(error);
  process.exit(1);
});
