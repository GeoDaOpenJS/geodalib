[geodalib](../../../modules.md) / [core/src](../index.md) / empiricalBayes

# Function: empiricalBayes()

> **empiricalBayes**(`baseValues`, `eventValues`): `number`[]

Defined in: [core/src/mapping/rates.ts:162](https://github.com/GeoDaCenter/geoda-lib/blob/9716a45cca9cf3b644d6187deeb842d47f2b7a3a/js/packages/core/src/mapping/rates.ts#L162)

## Description
Compute the empirical Bayes smoothed rates using the Poisson-Gamma model.

The EB estimate for risk in location i is:
$\pi_i^{EB} = w_i \cdot r_i + (1 - w_i) \cdot \theta$

where:
- $r_i$ is the crude (raw) rate
- $\theta$ is the reference rate (prior mean)
- $w_i$ is the weight calculated as: $w_i = \sigma^2/(\sigma^2 + \mu/P_i)$
- $P_i$ is the population at risk in area i
- $\mu$ and $\sigma^2$ are the mean and variance of the prior distribution

The method:
1. Estimates $\theta$ (theta1) as the reference rate: $\sum O_i/\sum P_i$
2. Estimates $\sigma^2$ (theta2) using the formula: $(\sum P_i(r_i - \mu)^2/\sum P_i) - \mu/(\sum P_i/n)$
3. If $\sigma^2$ is negative, sets it to 0 (conventional approach)
4. Computes weights and final smoothed rates

Small areas (with small population at risk) will have their rates adjusted considerably,
while larger areas will see minimal changes.

## Parameters

### baseValues

`number`[]

The values of base variable (P_i, population at risk).

### eventValues

`number`[]

The values of event variable (O_i, observed events).

## Returns

`number`[]

The empirical Bayes smoothed rates.
