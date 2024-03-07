/**
 * The quantile breaks algorithm to determine the best way to break up the data into k groups. Each group has the same number of observations.
 * @param k The number of classes/categories
 * @param data The numeric values to be classified.
 * @returns The breaks values.
 */
export declare function quantileBreaks(k: number, data: number[] | Float32Array): Promise<number[]>;
