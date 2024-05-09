/**
 * The percentile breaks implementation.
 * The percentile breaks include: < 1%, 1-10%, 10-50%, 50-90%, 90-99%, > 99%
 *
 * @param data The numeric values to be classified.
 * @returns The breaks values.
 */
export declare function percentileBreaks(data: number[] | Float32Array): Promise<number[]>;
