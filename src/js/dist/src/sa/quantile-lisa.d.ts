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
/**
 * Get local Quantile Lisa statistics
 * @param k The number of classes/categories
 * @param quantile The quantile value
 * @param data The numeric values to be classified.
 * @param neighbors The neighbors of each observation
 * @param permutation The number of permutations
 * @param significanceCutoff The significance cutoff
 * @param seed The seed value
 * @returns LISA result
 */
export declare function quantileLisa({ k, quantile, data, neighbors, permutation, significanceCutoff, seed }: QuantileLisaProps): Promise<LocalMoranResult>;
