/**
 * The implementation of box breaks with hinge = 1.5
 * The categories include: Lower outlier, < 25%, [25-50)%, [50-75)%, >= 75%, Upper outlier
 *
 * @param data The numeric values to be classified.
 * @returns The breaks values.
 */
export declare function hinge15Breaks(data: number[] | Float32Array): Promise<number[]>;
/**
 * The implementation of box breaks with hinge = 3.0
 * The categories include: Lower outlier, < 25%, [25-50)%, [50-75)%, >= 75%, Upper outlier
 *
 * @param data The numeric values to be classified.
 * @returns The breaks values.
 */
export declare function hinge30Breaks(data: number[] | Float32Array): Promise<number[]>;
