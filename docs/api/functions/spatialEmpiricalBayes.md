[geoda-wasm](../globals.md) / spatialEmpiricalBayes

# Function: spatialEmpiricalBayes()

> **spatialEmpiricalBayes**(`baseValues`, `eventValues`, `neighbors`): `number`[]

Defined in: [src/sa/rates.ts:240](https://github.com/GeoDaCenter/geoda-lib/blob/d16e85157b1f26754a712ea4c9a3cf18ab0e7b74/src/js/src/sa/rates.ts#L240)

## Description
Compute the spatial empirical Bayes smoothed rates using a local reference rate for each observation.

For each location i, the reference mean ($\mu_i$) is computed from its spatial window as:
$$\mu_i = \frac{\sum_j w_{ij}O_j}{\sum_j w_{ij}P_j}$$

The local prior variance ($\sigma^2_i$) is estimated as:
$$\sigma^2_i = \frac{\sum_j w_{ij}P_j(r_j - \mu_i)^2}{\sum_j w_{ij}P_j} - \frac{\mu_i}{\sum_j w_{ij}P_i/(k_i + 1)}$$

where:
- $w_{ij}$ are binary spatial weights (1 for neighbors, 0 otherwise)
- $O_j$ are observed events in area j
- $P_j$ are populations at risk in area j
- $r_j$ are crude rates in area j
- $k_i$ is the number of neighbors of area i

Key differences from standard EB:
1. Uses a local reference rate specific to each observation's spatial window
2. Requires sufficient observations in the reference window for effective smoothing
3. Block weights are useful to avoid irregularity in neighbor counts

Note: If the estimated variance is negative, it is set to zero as in standard EB.

## Parameters

### baseValues

`number`[]

The values of base variable (populations at risk, $P_i$).

### eventValues

`number`[]

The values of event variable (observed events, $O_i$).

### neighbors

`number`[][]

The list of neighbors for each location.

## Returns

`number`[]

The spatial empirical Bayes smoothed rates.
