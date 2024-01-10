import esbuild from 'esbuild';
import {copy as copyPlugin} from 'esbuild-plugin-copy';
import {existsSync} from 'fs';
import path from 'path';

const ROOT_PATH = path.resolve(__dirname, '..');
const DIST_DIRECTORY = path.resolve(ROOT_PATH, 'dist');
const WASM_PATH = path.resolve(ROOT_PATH, 'wasm/geoda.wasm');
if (!existsSync(WASM_PATH)) {
  throw new Error(`WASM file not found at ${WASM_PATH}, did you forget to run 'yarn wasm'?`);
}

const buildSettings: esbuild.BuildOptions = {
  platform: 'neutral',
  format: 'esm',
  bundle: true,
  target: 'es2020',
  external: ['fs', 'path'],
  minify: true,
  sourcemap: true
};

const copyWASM = copyPlugin({
  assets: {
    from: [WASM_PATH],
    to: [path.resolve(DIST_DIRECTORY, 'geoda.wasm')]
  }
});

esbuild.build({
  ...buildSettings,
  entryPoints: ['src/index.ts'],
  outdir: DIST_DIRECTORY,
  plugins: [copyWASM]
});

