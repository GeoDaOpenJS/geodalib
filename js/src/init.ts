import type {CustomEmbindModule} from '../wasm';
// @ts-expect-error - TS doesn't seem to like .cjs working alongside .d.ts
import geodaAny from '../wasm/index.cjs';

const geoda: () => Promise<CustomEmbindModule> = geodaAny;

// Singlton wasmInstance promise
let wasmInstancePromise: Promise<CustomEmbindModule> | null = null;

// Initialize geoda WASM instance
// You can use the promise directly, so it's compatible with functions that
// accept argument `wasm: CustomEmbindModule`. Or, use it to initialize a
// global wasm instance for synchronous function call,
// e.g.: initGeoDa().then(wasm => setGeoDa(wasm))
export async function initWASM(): Promise<CustomEmbindModule> {
  if (wasmInstancePromise === null) {
    wasmInstancePromise = geoda();
  }
  return wasmInstancePromise;
}

// Reset WASM instance after it throws runtime error e.g. OOM
export function resetWASM(): void {
  wasmInstancePromise = null;
  wasmInstance = null;
  // in case of sync call, try to re-initialize GeoDa immediately
  geoda().then(instance => {
    wasmInstance = instance;
  });
}

// Global nonPromise instance of GeoDa WASM module
let wasmInstance: CustomEmbindModule | null = null;

// User can use initWASM() to get a promise of GeoDa instance
// They can use the promise directly, or they can call `setWASM()`
// to keep the nonPromise geoda instance in this library globally.
export function setWASM(instance: CustomEmbindModule): void {
  wasmInstance = instance;
}

// return the global instance of GeoDa WASM module
// This should be called with cautious since it works depending on above
// functions to initialize the wasm instance succesfully.
// The result could be "null" which indicates geoda wasm instance has
// not been initialized successfully.
export function getWASM(): CustomEmbindModule | null {
  return wasmInstance;
}
