export type WeightsMeta = {
    [key: string]: unknown;
    id?: string;
    type?: 'knn' | 'threshold' | 'queen' | 'rook';
    symmetry?: 'symmetric' | 'asymmetric';
    numberOfObservations: number;
    minNeighbors: number;
    maxNeighbors: number;
    meanNeighbors: number;
    medianNeighbors: number;
    pctNoneZero: number;
    order?: number;
    incLowerOrder?: boolean;
    k?: number;
    threshold?: number;
    distanceMetric?: 'euclidean' | 'manhattan' | 'arc' | 'projected';
    distanceUnit?: 'Foot_US' | 'Yard_US' | 'Meter' | 'Kilometer' | 'NauticalMile' | 'Degree' | 'Radian';
};
/**
 * Get the meta data from the weights structure
 * @param weights the weights structure of every observation using row index
 * @returns WeightsMeta
 */
export declare function getMetaFromWeights(weights: number[][], isDistanceWeights?: boolean): WeightsMeta;
