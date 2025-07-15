// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

import type { GeoDaModule } from './wasm';

export type WasmModule = (
  options: { locateFile: () => string } | Record<string, never>
) => Promise<GeoDaModule>;

/**
 * Manages WebAssembly (WASM) initialization and configuration for GeoDa
 * Handles custom WASM URL settings and instance creation
 *
 * @class WASMManager
 */
class WASMManager {
  private customWASMUrl: string | null = null;
  private wasmInstancePromise: Promise<GeoDaModule> | null = null;
  public id: string = '';
  private wasmModule: WasmModule;

  /**
   * Creates a new WASMManager instance
   * @param {WasmModule} wasmModule - The WebAssembly module function that returns a Promise<GeoDaModule>
   */
  constructor(wasmModule: WasmModule) {
    this.wasmModule = wasmModule;
    this.wasmInstancePromise = null;
    this.customWASMUrl = null;
    // random id
    this.id =
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  /**
   * Sets a custom URL for the WASM file
   * @param {string} wasmUrl - The absolute URL where the WASM file is hosted
   * @returns {void}
   */
  setDeliveryWASM(wasmUrl: string): void {
    this.customWASMUrl = wasmUrl;
  }

  /**
   * Retrieves the currently set custom WASM URL
   * @returns {string | null} The custom WASM URL if set, null otherwise
   */
  getDeliveryWASM(): string | null {
    return this.customWASMUrl;
  }

  /**
   * Initializes the WASM instance with the configured settings
   * @param {string} [publicWASMUrl] - Optional URL to set as the WASM delivery URL before initialization
   * @returns {Promise<GeoDaModule>} Promise resolving to the initialized GeoDaModule
   * @throws {Error} Throws an error if custom WASM URL is not set
   */
  async initWASM(publicWASMUrl?: string): Promise<GeoDaModule> {
    if (publicWASMUrl) {
      this.setDeliveryWASM(publicWASMUrl);
    }
    if (this.customWASMUrl === null) {
      throw new Error('Custom WASM URL is not set');
    }
    if (this.wasmInstancePromise === null) {
      const wasmUrl = this.customWASMUrl;
      this.wasmInstancePromise = this.wasmModule(wasmUrl ? { locateFile: () => wasmUrl } : {});
    }
    return this.wasmInstancePromise;
  }

  /**
   * Resets the WASM instance by clearing the stored promise
   * Allows for re-initialization of the WASM module
   * @returns {Promise<void>}
   */
  async resetWASM(): Promise<void> {
    this.wasmInstancePromise = null;
  }
}

/**
 * Factory function to create a new WASMManager instance
 * @param {WasmModule} wasmModule - The WebAssembly module function
 * @returns {WASMManager} A new WASMManager instance
 * @see {@link WASMManager} for detailed documentation of the manager class
 */
export const createWASMManager = (wasmModule: WasmModule) => new WASMManager(wasmModule);
