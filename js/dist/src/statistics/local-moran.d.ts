import { VectorDouble } from '../../wasm';
export type LocalMoranResultType = {
    isValid: boolean;
    clusters: number[];
    lagValues: number[];
    pValues: number[];
    lisaValues: number[];
};
export declare function localMoran(data: number[] | Float32Array, neighbors: number[][], permutation: number): Promise<LocalMoranResultType>;
export declare function vecDoubleToNumber(data: VectorDouble): number[];
