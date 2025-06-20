/**
 * Compute spatial lag of a list of values based on a list of neighbors and weights.
 *
 * ## Example
 * ```ts
 * import { spatialLag } from '@geoda/lisa';
 *
 * const values = [1, 2, 3, 4, 5];
 * const neighbors = [[1], [0, 2], [1, 3], [2, 4], [3]];
 *
 * const result = spatialLag(values, neighbors);
 *
 * console.log(result);
 * ```
 *
 * @param values The numeric values to compute spatial lag for.
 * @param neighbors The list of neighbors for each value.
 * @param weights The weight values for each neighbor.
 * @param useSelfNeighbor The flag to include self as a neighbor.
 * @param rowStandardize The flag to row standardize the spatial lag.
 * @returns The spatial lag values.
 */
// eslint-disable-next-line max-statements, complexity
export function spatialLag(
  values: number[],
  neighbors: number[][],
  rowStandardize = true,
  weights?: number[][],
  useSelfNeighbor?: boolean
): number[] {
  const n = values.length;
  const isBinaryWeights = weights === undefined;

  const result = new Array(n).fill(0);
  // for each observation
  for (let i = 0; i < n; i++) {
    let lag = 0;
    let numOfNbrs = 0;
    let isSelfIncluded = false;
    // get neighbors of observation i
    const nn = neighbors[i];
    // for each neighbor
    for (let j = 0; j < nn.length; j++) {
      // skip self
      if (i === nn[j]) {
        isSelfIncluded = true;
        continue;
      }
      if (isBinaryWeights) {
        lag += values[nn[j]];
        numOfNbrs += 1;
      } else {
        lag += values[nn[j]] * weights[i][j];
        numOfNbrs += weights[i][j];
      }
    }
    // compute spatial lag
    if (isBinaryWeights) {
      // contiguity weights
      if (useSelfNeighbor) {
        lag += values[i];
        numOfNbrs += 1;
      }
      if (rowStandardize) {
        lag = numOfNbrs > 0 ? lag / numOfNbrs : 0;
      }
    } else {
      // inverse or kernel weights
      if (rowStandardize) {
        lag = numOfNbrs > 0 ? lag / numOfNbrs : 0;
      }
      // TODO why rowStandardize is before useSelfNeighbor?
      if (useSelfNeighbor) {
        // eslint-disable-next-line max-depth
        if (isSelfIncluded) {
          // only for kernel weights with diagonal elements
          lag += values[i] * weights[i][nn.length];
        } else {
          lag += values[i];
        }
      }
    }
    result[i] = lag;
  }
  return result;
}

/**
 * Compute the median spatial lag of a list of values based on a list of neighbors and weights using the mean function.
 *
 * ## Example
 * ```ts
 * import { spatialLagMedian } from '@geoda/lisa';
 *
 * const values = [1, 2, 3, 4, 5];
 * const neighbors = [[1], [0, 2], [1, 3], [2, 4], [3]];
 *
 * const result = spatialLagMedian(values, neighbors);
 *
 * console.log(result);
 * ```
 *
 * @param values The numeric values to compute spatial lag for.
 * @param neighbors The list of neighbors for each value.
 * @returns The spatial lag values.
 */
export function spatialLagMedian(values: number[], neighbors: number[][]): number[] {
  const n = values.length;

  const result = new Array(n).fill(0);
  // for each observation
  for (let i = 0; i < n; i++) {
    // exclude self i from neighbors
    const nn = neighbors[i].filter(j => j !== i);
    const vals = nn.map(j => values[j]);
    vals.sort((a, b) => a - b);

    // if odd number of neighbors, return the middle value
    // if even number of neighbors, return the average of the two middle values
    const mid = Math.floor(nn.length / 2);
    if (nn.length % 2 === 0) {
      result[i] = (vals[mid - 1] + vals[mid]) / 2;
    } else {
      result[i] = vals[mid];
    }
  }
  return result;
}
