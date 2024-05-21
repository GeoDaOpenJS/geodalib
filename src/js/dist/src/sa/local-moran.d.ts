export type LocalMoranResult = {
    isValid: boolean;
    clusters: number[];
    lagValues: number[];
    pValues: number[];
    lisaValues: number[];
    sigCategories: number[];
    nn: number[];
    labels: string[];
    colors: string[];
};
export type LocalMoranProps = {
    data: number[] | Float32Array;
    neighbors: number[][];
    permutation: number;
    significanceCutoff?: number;
    seed?: number;
};
export declare function localMoran({ data, neighbors, permutation, significanceCutoff, seed }: LocalMoranProps): Promise<LocalMoranResult>;
