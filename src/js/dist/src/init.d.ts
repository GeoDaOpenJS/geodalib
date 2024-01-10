import type { GeoDaModule } from '../wasm';
export declare function initWASM(): Promise<GeoDaModule>;
export declare function resetWASM(): void;
export declare function setWASM(instance: GeoDaModule): void;
export declare function getWASM(): GeoDaModule | null;
