import { dtsPlugin } from 'esbuild-plugin-d.ts';
import { copy as copyPlugin } from 'esbuild-plugin-copy';
import { createBaseConfig, buildFormat } from '../../esbuild.config.mjs';

const copyWASM = copyPlugin({
  assets: {
    from: ['./src/wasm/index.d.ts'],
    to: ['./wasm/index.d.ts'],
  },
});

const baseConfig = createBaseConfig({
  target: ['es2020'],
  mainFields: ['module', 'main'],
  external: ['fs', 'path'],
  entryPoints: ['src/index.ts'],
  plugins: [dtsPlugin(), copyWASM],
});

// Build all formats
Promise.all([
  buildFormat(baseConfig, 'esm', 'dist/index.js'),
]).catch((error) => {
  console.error(error);
  process.exit(1);
});