import { createWASMManager } from '@geoda/common';
import wasmModule from '../wasm/index.cjs';

const wasmManager = createWASMManager(wasmModule);

wasmManager.setDeliveryWASM('https://cdn.jsdelivr.net/npm/@geoda/core@latest/dist/geoda-core.wasm');

export async function initWASM(wasmURL?: string) {
  console.log('wasmManager', wasmManager.id);
  return await wasmManager.initWASM(wasmURL);
}

export async function resetWASM() {
  return await wasmManager.resetWASM();
}
