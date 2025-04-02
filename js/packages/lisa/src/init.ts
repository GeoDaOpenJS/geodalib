import { createWASMManager } from '@geoda/common';
import { VERSION } from '@geoda/common';
// @ts-expect-error wasm module is not typed by emscripten
import wasmModule from '../wasm/index.cjs';

import { resolve } from 'path';

const wasmManager = createWASMManager(wasmModule);

// Detect if we're in Node.js environment
const isNode =
  typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

// use CDN URL by default
wasmManager.setDeliveryWASM(
  `https://cdn.jsdelivr.net/npm/@geoda/lisa@${VERSION}/wasm/geoda-lisa.wasm`
);

// if in Node.js, use local WASM file
if (isNode) {
  // For Node.js, construct absolute path to wasm file in node_modules
  const wasmPath = resolve(__dirname, '../wasm/geoda-lisa.wasm');
  const wasmUrl = `file://${wasmPath}`;
  wasmManager.setDeliveryWASM(wasmUrl);
}

export function setDeliveryWASM(wasmURL: string) {
  wasmManager.setDeliveryWASM(wasmURL);
}

export async function initWASM(wasmURL?: string) {
  return await wasmManager.initWASM(wasmURL);
}

export async function resetWASM() {
  return await wasmManager.resetWASM();
}
