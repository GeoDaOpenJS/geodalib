import { LocalMoranResult } from './local-moran';
export type LocalGProps = {
    data: number[] | Float32Array;
    neighbors: number[][];
    permutation: number;
    significanceCutoff?: number;
    seed?: number;
};
export declare function localG(props: LocalGProps): Promise<LocalMoranResult>;
export declare function localGStar(props: LocalGProps): Promise<LocalMoranResult>;
