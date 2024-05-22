import { LocalMoranResult } from './local-moran';
export type LocalGearyProps = {
    data: number[] | Float32Array;
    neighbors: number[][];
    permutation: number;
    significanceCutoff?: number;
    seed?: number;
};
export declare function localGeary({ data, neighbors, permutation, significanceCutoff, seed }: LocalGearyProps): Promise<LocalMoranResult>;
export type MultivariateLocalGearyProps = {
    data: number[][];
    neighbors: number[][];
    permutation: number;
    significanceCutoff?: number;
    seed?: number;
};
export declare function multivariateLocalGeary({ data, neighbors, permutation, significanceCutoff, seed }: MultivariateLocalGearyProps): Promise<LocalMoranResult>;
