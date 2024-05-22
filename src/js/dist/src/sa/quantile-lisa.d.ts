import { LocalMoranResult } from './local-moran';
export type QuantileLisaProps = {
    k: number;
    quantile: number;
    data: number[] | Float32Array;
    neighbors: number[][];
    permutation: number;
    significanceCutoff?: number;
    seed?: number;
};
export declare function quantileLisa({ k, quantile, data, neighbors, permutation, significanceCutoff, seed }: QuantileLisaProps): Promise<LocalMoranResult>;
