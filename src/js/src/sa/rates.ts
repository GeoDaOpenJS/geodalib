export enum RatesOptions {
  RawRates = 'Raw Rates',
  ExcessRisk = 'Excess Risk',
  EmpiricalRisk = 'Empirical Risk',
  SpatialRates = 'Spatial Rates',
  SpatialEmpiricalRates = 'Spatial Empirical Rates',
  EBRateStandardization = 'EB Rate Standardization'
}

export type CalculateRatesProps = {
  eventValues: number[];
  baseValues: number[];
  method: string;
  neighbors?: number[][];
};

export function calculateRates({
  eventValues,
  baseValues,
  method,
  neighbors
}: CalculateRatesProps): number[] {
  switch (method) {
    case RatesOptions.RawRates:
      return rawRates(baseValues, eventValues);
    case RatesOptions.ExcessRisk:
      return excessRisk(baseValues, eventValues);
    case RatesOptions.EmpiricalRisk:
      return empiricalBayes(baseValues, eventValues);
    case RatesOptions.SpatialRates:
      return neighbors ? spatialRates(baseValues, eventValues, neighbors) : [];
    case RatesOptions.SpatialEmpiricalRates:
      return neighbors ? spatialEmpiricalBayes(baseValues, eventValues, neighbors) : [];
    case RatesOptions.EBRateStandardization:
      return rateStandardizeEB(baseValues, eventValues);
    default:
      return [];
  }
}

/**
 * Compute Raw Rate or crude rate (proportion), the simple ratio of the events
 * (number of lung cancer cases) over the population at risk (the county population).
 *
 * @param baseValues The values of base variable.
 * @param eventValues The values of event variable.
 * @returns The rates values.
 */
export function rawRates(baseValues: number[], eventValues: number[]): number[] {
  const n = baseValues.length;
  const rates = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    if (baseValues[i] > 0) {
      rates[i] = eventValues[i] / baseValues[i];
    } else {
      rates[i] = 0;
    }
  }
  return rates;
}

/**
 * Compute excess risk (relative risk), the ratio of the observed number of cases
 * to the expected number of cases in the population.
 *
 * @param baseValues The values of base variable.
 * @param eventValues The values of event variable.
 * @returns The rates values.
 */
export function excessRisk(baseValues: number[], eventValues: number[]): number[] {
  const n = baseValues.length;
  const risks = new Array(n).fill(0);

  let SP = 0;
  let SE = 0;

  for (let i = 0; i < n; i++) {
    SP += baseValues[i];
    SE += eventValues[i];
  }

  let lambda = 1;
  if (SP > 0) {
    lambda = SE / SP;
  }

  for (let i = 0; i < n; i++) {
    const eHat = baseValues[i] * lambda;
    if (eHat > 0) {
      risks[i] = eventValues[i] / eHat;
    } else {
      risks[i] = 0;
    }
  }

  return risks;
}

/**
 * Compute the empirical Bayes smoothed rates, which is a weighted average of the crude rate
 * and the overall rate, where the weights are based on the variability of the crude rates.
 *
 * @param baseValues The values of base variable.
 * @param eventValues The values of event variable.
 * @returns The rates values.
 */
export function empiricalBayes(baseValues: number[], eventValues: number[]): number[] {
  const n = baseValues.length;
  const results = new Array(n).fill(0);
  const piRaw = new Array(n).fill(0);
  let SP = 0;
  let SE = 0;

  for (let i = 0; i < n; i++) {
    SP += baseValues[i];
    SE += eventValues[i];
    if (baseValues[i] > 0) {
      piRaw[i] = eventValues[i] / baseValues[i];
    }
  }

  const theta1 = SP > 0 ? SE / SP : 1;
  const pBar = SP / n;
  let q1 = 0;
  let w = 0;

  for (let i = 0; i < n; i++) {
    q1 += Math.pow(piRaw[i] - theta1, 2) * baseValues[i];
  }
  let theta2 = q1 / SP - theta1 / pBar;

  if (theta2 < 0) {
    theta2 = 0;
  }

  for (let i = 0; i < n; i++) {
    q1 = theta2 + theta1 / baseValues[i];
    w = q1 > 0 ? theta2 / q1 : 1;
    results[i] = w * piRaw[i] + (1 - w) * theta1;
  }

  return results;
}

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
export function spatialEmpiricalBayes(
  baseValues: number[],
  eventValues: number[],
  neighbors: number[][]
): number[] {
  const n = baseValues.length;
  const results = new Array(n).fill(0);
  const piRaw = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    piRaw[i] = baseValues[i] > 0 ? eventValues[i] / baseValues[i] : 1;
  }

  for (let i = 0; i < n; i++) {
    let SP = baseValues[i];
    let SE = eventValues[i];
    const nn = neighbors[i];

    for (let j = 0; j < nn.length; j++) {
      SP += baseValues[nn[j]];
      SE += eventValues[nn[j]];
    }

    const theta1 = SP > 0 ? SE / SP : 1;

    if (nn.length > 0) {
      const pBar = SP / (nn.length + 1);
      let q1 = Math.pow(piRaw[i] - theta1, 2) * baseValues[i];

      for (let j = 0; j < nn.length; j++) {
        q1 += Math.pow(piRaw[nn[j]] - theta1, 2) * baseValues[nn[j]];
      }

      let theta2 = q1 / SP - theta1 / pBar;

      if (theta2 < 0) {
        theta2 = 0;
      }

      q1 = theta2 + theta1 / baseValues[i];
      const w = q1 > 0 ? theta2 / q1 : 1;
      results[i] = w * piRaw[i] + (1 - w) * theta1;
    }
  }

  return results;
}

/**
 * Compute the spatial rates, which is the ratio of the events (number of lung cancer cases)
 * over the population at risk (the county population) and its neighbors.
 *
 * @param baseValues The values of base variable.
 * @param eventValues The values of event variable.
 * @param neighbors The list of neighbors for each value.
 * @returns The rates values.
 */
export function spatialRates(
  baseValues: number[],
  eventValues: number[],
  neighbors: number[][]
): number[] {
  const n = baseValues.length;
  const rates = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    let SP = baseValues[i];
    let SE = eventValues[i];
    const nn = neighbors[i];

    for (let j = 0; j < nn.length; j++) {
      SP += baseValues[nn[j]];
      SE += eventValues[nn[j]];
    }

    if (baseValues[i] + SP > 0) {
      rates[i] = (eventValues[i] + SE) / (baseValues[i] + SP);
    }
  }

  return rates;
}

export function rateStandardizeEB(baseValues: number[], eventValues: number[]): number[] {
  const n = baseValues.length;
  const results = new Array(n).fill(0);
  const piRaw = new Array(n).fill(0);
  let SP = 0;
  let SE = 0;

  // compute pi, the rate i, and the pop. rate b_hat
  for (let i = 0; i < n; i++) {
    SP += baseValues[i];
    SE += eventValues[i];
    if (baseValues[i] > 0) {
      piRaw[i] = eventValues[i] / baseValues[i];
    }
  }

  if (SP === 0) {
    return results;
  }

  const bHat = SE / SP;

  // compute a_hat, the variance
  let gamma = 0;
  for (let i = 0; i < n; i++) {
    gamma += Math.pow(piRaw[i] - bHat, 2) * baseValues[i];
  }

  const a = gamma / SP - bHat / (SP / n);
  const aHat = a > 0 ? a : 0;

  for (let i = 0; i < n; i++) {
    const se = baseValues[i] > 0 ? Math.sqrt(aHat + bHat / baseValues[i]) : 0;
    results[i] = se > 0 ? (piRaw[i] - bHat) / se : 0;
  }

  return results;
}
