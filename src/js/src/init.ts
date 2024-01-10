import type {GeoDaModule} from '../wasm';
// @ts-expect-error - geodaAny is not used
import geodaAny from '../wasm/index.cjs';

const geoda: () => Promise<GeoDaModule> = geodaAny;

// Singlton wasmInstance promise
let wasmInstancePromise: Promise<GeoDaModule> | null = null;

// Initialize geoda WASM instance
export async function initWASM(): Promise<GeoDaModule> {
  if (wasmInstancePromise === null) {
    wasmInstancePromise = geoda();
  }
  return wasmInstancePromise;
}

// Reset WASM instance
export function resetWASM(): void {
  wasmInstancePromise = null;
  wasmInstance = null;
  geoda().then(instance => {
    wasmInstance = instance;
  });
}

// Global nonPromise instance of GeoDa WASM module
let wasmInstance: GeoDaModule | null = null;

// Set the global instance of GeoDa WASM module
export function setWASM(instance: GeoDaModule): void {
  wasmInstance = instance;
}

// Get the global instance of GeoDa WASM module
export function getWASM(): GeoDaModule | null {
  return wasmInstance;
}
