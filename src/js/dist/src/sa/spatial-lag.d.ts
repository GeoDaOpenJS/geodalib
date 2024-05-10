/**
 * Compute spatial lag of a list of values based on a list of neighbors and weights.
 * @param values The numeric values to compute spatial lag for.
 * @param neighbors The list of neighbors for each value.
 * @param weights The weight values for each neighbor.
 * @param useSelfNeighbor The flag to include self as a neighbor.
 * @param rowStandardize The flag to row standardize the spatial lag.
 * @returns The spatial lag values.
 */
export declare function spatialLag(values: number[], neighbors: number[][], rowStandardize?: boolean, weights?: number[][], useSelfNeighbor?: boolean): number[];
/**
 * Compute the median spatial lag of a list of values based on a list of neighbors and weights using the mean function.
 * @param values The numeric values to compute spatial lag for.
 * @param neighbors The list of neighbors for each value.
 * @returns The spatial lag values.
 */
export declare function spatialLagMedian(values: number[], neighbors: number[][]): number[];
