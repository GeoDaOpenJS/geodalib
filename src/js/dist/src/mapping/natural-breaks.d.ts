/**
 * The natural breaks (Jenks) algorithm to determine the best way to break up the data into k different groups.
 * The values in each group are as similar as possible to each other, and as different as possible from the values in the other groups.
 * @param k The number of classes/categories
 * @param data The numeric values to be classified.
 * @returns The breaks values.
 */
export declare function naturalBreaks(k: number, data: number[] | Float32Array): Promise<number[]>;
