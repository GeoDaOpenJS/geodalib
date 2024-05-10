export declare enum RatesOptions {
    RawRates = "Raw Rates",
    ExcessRisk = "Excess Risk",
    EmpiricalRisk = "Empirical Risk",
    SpatialRates = "Spatial Rates",
    SpatialEmpiricalRates = "Spatial Empirical Rates",
    EBRateStandardization = "EB Rate Standardization"
}
export type CalculateRatesProps = {
    eventValues: number[];
    baseValues: number[];
    method: string;
    neighbors?: number[][];
};
export declare function calculateRates({ eventValues, baseValues, method, neighbors }: CalculateRatesProps): number[];
/**
 * Compute Raw Rate or crude rate (proportion), the simple ratio of the events
 * (number of lung cancer cases) over the population at risk (the county population).
 *
 * @param baseValues The values of base variable.
 * @param eventValues The values of event variable.
 * @returns The rates values.
 */
export declare function rawRates(baseValues: number[], eventValues: number[]): number[];
/**
 * Compute excess risk (relative risk), the ratio of the observed number of cases
 * to the expected number of cases in the population.
 *
 * @param baseValues The values of base variable.
 * @param eventValues The values of event variable.
 * @returns The rates values.
 */
export declare function excessRisk(baseValues: number[], eventValues: number[]): number[];
/**
 * Compute the empirical Bayes smoothed rates, which is a weighted average of the crude rate
 * and the overall rate, where the weights are based on the variability of the crude rates.
 *
 * @param baseValues The values of base variable.
 * @param eventValues The values of event variable.
 * @returns The rates values.
 */
export declare function empiricalBayes(baseValues: number[], eventValues: number[]): number[];
/**
 * Compute the spatial empirical Bayes smoothed rates, which is a weighted average of the crude rate
 * and the overall rate, where the weights are based on the variability of the crude rates and the
 * spatial autocorrelation of the rates.
 *
 * @param baseValues The values of base variable.
 * @param eventValues The values of event variable.
 * @param neighbors The list of neighbors for each value.
 * @returns The rates values.
 */
export declare function spatialEmpiricalBayes(baseValues: number[], eventValues: number[], neighbors: number[][]): number[];
/**
 * Compute the spatial rates, which is the ratio of the events (number of lung cancer cases)
 * over the population at risk (the county population) and its neighbors.
 *
 * @param baseValues The values of base variable.
 * @param eventValues The values of event variable.
 * @param neighbors The list of neighbors for each value.
 * @returns The rates values.
 */
export declare function spatialRates(baseValues: number[], eventValues: number[], neighbors: number[][]): number[];
export declare function rateStandardizeEB(baseValues: number[], eventValues: number[]): number[];
