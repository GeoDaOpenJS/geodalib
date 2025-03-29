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
 * ## Description
 * Compute excess risk (relative risk), the ratio of the observed rate at a location to some reference rate.
 *
 * The reference risk ($\bar{\pi}$) is estimated from the aggregate of all observations as:
 * $\bar{\pi} = \frac{\sum O_i}{\sum P_i}$
 * where $O_i$ is the observed number of events and $P_i$ is the population/denominator.
 * This is not a simple average of rates, but rather a population-weighted average
 * that properly assigns the contribution of each area to the overall total.
 * 
 * The expected value ($E_i$) for each observation is then calculated as:
 * $E_i = \bar{\pi} \times P_i$
 * 
 * The relative risk ($RR_i$) then follows as:
 * $RR_i = \frac{r_i}{\bar{\pi_i}} = \frac{O_i/P_i}{E_i/P_i} = \frac{O_i}{E_i}$
 * 
 * If an area matches the (regional) reference rate, the corresponding relative risk is one. Values greater
 * than one suggest an excess, whereas values smaller than one suggest a shortfall. The interpretation
 * depends on the context. For example, in disease analysis, a relative risk larger than one would indicate
 * an area where the prevalence of the disease is greater than would be expected. In regional economics,
 * a location quotient greater than one, suggests employment in a sector that exceeds the local needs,
 * implying an export sector.
 * 
 * In public health, this ratio is known as standardized mortality rate (SMR).
 * In regional economics, when applied to employment sectors, it's called a location quotient (LQ).
 *
 * @example
 * ```ts
 * import { excessRisk } from 'geoda-lib';
 * const baseValues = [100, 200, 300, 400, 500];
 * const eventValues = [10, 20, 30, 40, 50];
 * const rates = excessRisk(baseValues, eventValues);
 * ```
 * 
 * @param baseValues The values of base variable.
 * @param eventValues The values of event variable.
 * @returns The rates values.
 */
export function excessRisk(baseValues: number[], eventValues: number[]): number[] {
  const n = baseValues.length;
  const risks = new Array(n).fill(0);

  // SP = ∑P_i (sum of base values)
  // SE = ∑O_i (sum of event values)
  let SP = 0;
  let SE = 0;

  for (let i = 0; i < n; i++) {
    SP += baseValues[i];
    SE += eventValues[i];
  }

  // lambda = π̄ = SE/SP = ∑O_i/∑P_i
  let lambda = 1;
  if (SP > 0) {
    lambda = SE / SP;
  }

  for (let i = 0; i < n; i++) {
    // eHat = E_i = π̄ × P_i
    const eHat = baseValues[i] * lambda;
    if (eHat > 0) {
      // risks[i] = RR_i = O_i/E_i
      risks[i] = eventValues[i] / eHat;
    } else {
      risks[i] = 0;
    }
  }

  return risks;
}

/**
 * ## Description
 * Compute the empirical Bayes smoothed rates using the Poisson-Gamma model.
 * 
 * The EB estimate for risk in location i is:
 * $\pi_i^{EB} = w_i \cdot r_i + (1 - w_i) \cdot \theta$
 * 
 * where:
 * - $r_i$ is the crude (raw) rate
 * - $\theta$ is the reference rate (prior mean)
 * - $w_i$ is the weight calculated as: $w_i = \sigma^2/(\sigma^2 + \mu/P_i)$
 * - $P_i$ is the population at risk in area i
 * - $\mu$ and $\sigma^2$ are the mean and variance of the prior distribution
 * 
 * The method:
 * 1. Estimates $\theta$ (theta1) as the reference rate: $\sum O_i/\sum P_i$
 * 2. Estimates $\sigma^2$ (theta2) using the formula: $(\sum P_i(r_i - \mu)^2/\sum P_i) - \mu/(\sum P_i/n)$
 * 3. If $\sigma^2$ is negative, sets it to 0 (conventional approach)
 * 4. Computes weights and final smoothed rates
 * 
 * Small areas (with small population at risk) will have their rates adjusted considerably,
 * while larger areas will see minimal changes.
 *
 * @param baseValues The values of base variable (P_i, population at risk).
 * @param eventValues The values of event variable (O_i, observed events).
 * @returns The empirical Bayes smoothed rates.
 */
export function empiricalBayes(baseValues: number[], eventValues: number[]): number[] {
  const n = baseValues.length;
  const results = new Array(n).fill(0);
  const piRaw = new Array(n).fill(0);
  let SP = 0;  // Sum of populations (∑P_i)
  let SE = 0;  // Sum of events (∑O_i)

  // Calculate raw rates (r_i) and sums
  for (let i = 0; i < n; i++) {
    SP += baseValues[i];
    SE += eventValues[i];
    if (baseValues[i] > 0) {
      piRaw[i] = eventValues[i] / baseValues[i];  // r_i = O_i/P_i
    }
  }

  // Calculate theta1 (θ) - the reference rate (prior mean μ)
  const theta1 = SP > 0 ? SE / SP : 1;
  const pBar = SP / n;  // Average population

  // Calculate components for variance estimation
  let q1 = 0;
  let w = 0;

  // Calculate sum of squared deviations weighted by population
  for (let i = 0; i < n; i++) {
    q1 += Math.pow(piRaw[i] - theta1, 2) * baseValues[i];
  }
  
  // Calculate theta2 (σ²) - the variance estimate
  // Formula: σ² = (∑P_i(r_i - μ)²/∑P_i) - μ/(∑P_i/n)
  let theta2 = q1 / SP - theta1 / pBar;

  // Convention: set negative variance to zero
  if (theta2 < 0) {
    theta2 = 0;
  }

  // Calculate final smoothed rates using weights
  for (let i = 0; i < n; i++) {
    q1 = theta2 + theta1 / baseValues[i];  // σ² + μ/P_i
    w = q1 > 0 ? theta2 / q1 : 1;         // w_i = σ²/(σ² + μ/P_i)
    // Final smoothed rate: π_i^EB = w_i * r_i + (1 - w_i) * θ
    results[i] = w * piRaw[i] + (1 - w) * theta1;
  }

  return results;
}

/**
 * ## Description
 * Compute the spatial empirical Bayes smoothed rates using a local reference rate for each observation.
 * 
 * For each location i, the reference mean ($\mu_i$) is computed from its spatial window as:
 * $$\mu_i = \frac{\sum_j w_{ij}O_j}{\sum_j w_{ij}P_j}$$
 * 
 * The local prior variance ($\sigma^2_i$) is estimated as:
 * $$\sigma^2_i = \frac{\sum_j w_{ij}P_j(r_j - \mu_i)^2}{\sum_j w_{ij}P_j} - \frac{\mu_i}{\sum_j w_{ij}P_i/(k_i + 1)}$$
 * 
 * where:
 * - $w_{ij}$ are binary spatial weights (1 for neighbors, 0 otherwise)
 * - $O_j$ are observed events in area j
 * - $P_j$ are populations at risk in area j
 * - $r_j$ are crude rates in area j
 * - $k_i$ is the number of neighbors of area i
 * 
 * Key differences from standard EB:
 * 1. Uses a local reference rate specific to each observation's spatial window
 * 2. Requires sufficient observations in the reference window for effective smoothing
 * 3. Block weights are useful to avoid irregularity in neighbor counts
 * 
 * Note: If the estimated variance is negative, it is set to zero as in standard EB.
 * 
 * @param baseValues The values of base variable (populations at risk, $P_i$).
 * @param eventValues The values of event variable (observed events, $O_i$).
 * @param neighbors The list of neighbors for each location.
 * @returns The spatial empirical Bayes smoothed rates.
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
