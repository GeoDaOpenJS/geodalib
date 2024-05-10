/**
 * The standard deviation breaks implementation.
 * The standard deviation breaks include: < -2 std dev, [-2, -1) std dev, [-1, 0) std dev, [0, 1] std dev, (1, 2] std dev, > 2 std dev
 *
 * @param data The numeric values to be classified.
 * @returns The breaks values.
 */
export declare function standardDeviationBreaks(data: number[] | Float32Array): Promise<number[]>;
