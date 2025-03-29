import { createWASMManager } from '@geoda/common';
import wasmModule from '../wasm/index.cjs';

const wasmManager = createWASMManager(wasmModule);

wasmManager.setDeliveryWASM(
  'https://cdn.jsdelivr.net/npm/@geoda/regression@latest/dist/geoda-regression.wasm'
);

export async function initWASM(wasmURL?: string) {
  return await wasmManager.initWASM(wasmURL);
}

export async function resetWASM() {
  return await wasmManager.resetWASM();
}
