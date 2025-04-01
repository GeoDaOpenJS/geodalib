import { createWASMManager } from '@geoda/common';
import { VERSION } from '@geoda/common';
// @ts-expect-error wasm module is not typed by emscripten
import wasmModule from '../wasm/index.cjs';

const wasmManager = createWASMManager(wasmModule);

wasmManager.setDeliveryWASM(
  `https://cdn.jsdelivr.net/npm/@geoda/lisa@${VERSION}/wasm/geoda-lisa.wasm`
);

export function setDeliveryWASM(wasmURL: string) {
  wasmManager.setDeliveryWASM(wasmURL);
}

export async function initWASM(wasmURL?: string) {
  return await wasmManager.initWASM(wasmURL);
}

export async function resetWASM() {
  return await wasmManager.resetWASM();
}
