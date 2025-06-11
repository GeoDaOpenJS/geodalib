[geodalib](../../../modules.md) / [core/src](../index.md) / excessRisk

# Function: excessRisk()

> **excessRisk**(`baseValues`, `eventValues`): `number`[]

Defined in: [core/src/mapping/rates.ts:101](https://github.com/GeoDaCenter/geoda-lib/blob/fd732718ef3d9fb5e87d0aa5ef9ee659a7cf3f31/js/packages/core/src/mapping/rates.ts#L101)

## Description
Compute excess risk (relative risk), the ratio of the observed rate at a location to some reference rate.

The reference risk ($\bar{\pi}$) is estimated from the aggregate of all observations as:
$\bar{\pi} = \frac{\sum O_i}{\sum P_i}$
where $O_i$ is the observed number of events and $P_i$ is the population/denominator.
This is not a simple average of rates, but rather a population-weighted average
that properly assigns the contribution of each area to the overall total.

The expected value ($E_i$) for each observation is then calculated as:
$E_i = \bar{\pi} \times P_i$

The relative risk ($RR_i$) then follows as:
$RR_i = \frac{r_i}{\bar{\pi_i}} = \frac{O_i/P_i}{E_i/P_i} = \frac{O_i}{E_i}$

If an area matches the (regional) reference rate, the corresponding relative risk is one. Values greater
than one suggest an excess, whereas values smaller than one suggest a shortfall. The interpretation
depends on the context. For example, in disease analysis, a relative risk larger than one would indicate
an area where the prevalence of the disease is greater than would be expected. In regional economics,
a location quotient greater than one, suggests employment in a sector that exceeds the local needs,
implying an export sector.

In public health, this ratio is known as standardized mortality rate (SMR).
In regional economics, when applied to employment sectors, it's called a location quotient (LQ).

## Parameters

### baseValues

`number`[]

The values of base variable.

### eventValues

`number`[]

The values of event variable.

## Returns

`number`[]

The rates values.

## Example

```ts
import { excessRisk } from 'geoda-lib';
const baseValues = [100, 200, 300, 400, 500];
const eventValues = [10, 20, 30, 40, 50];
const rates = excessRisk(baseValues, eventValues);
```
