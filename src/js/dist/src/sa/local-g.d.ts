import { LocalMoranResult } from './local-moran';
export type LocalGProps = {
    data: number[] | Float32Array;
    neighbors: number[][];
    permutation: number;
    significanceCutoff?: number;
    seed?: number;
    isGStar?: boolean;
};
export declare function localGStar({ data, neighbors, permutation, significanceCutoff, seed }: LocalGProps): Promise<LocalMoranResult>;
export declare function localG({ data, neighbors, permutation, significanceCutoff, seed, isGStar }: LocalGProps): Promise<LocalMoranResult>;
