import type { CustomEmbindModule } from '../wasm';
export declare function initWASM(): Promise<CustomEmbindModule>;
export declare function resetWASM(): void;
export declare function setWASM(instance: CustomEmbindModule): void;
export declare function getWASM(): CustomEmbindModule | null;
