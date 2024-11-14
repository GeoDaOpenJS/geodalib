export type WeightsMeta = {
  [key: string]: unknown;
  id?: string;
  type?: 'knn' | 'threshold' | 'queen' | 'rook';
  symmetry?: 'symmetric' | 'asymmetric';
  numberOfObservations: number;
  minNeighbors: number;
  maxNeighbors: number;
  meanNeighbors: number;
  medianNeighbors: number;
  pctNoneZero: number;
  order?: number;
  incLowerOrder?: boolean;
  k?: number;
  threshold?: number;
  distanceMetric?: 'euclidean' | 'manhattan' | 'arc' | 'projected';
  distanceUnit?:
    | 'Foot_US'
    | 'Yard_US'
    | 'Meter'
    | 'Kilometer'
    | 'NauticalMile'
    | 'Degree'
    | 'Radian';
};

/**
 * Get the meta data from the weights structure
 * @param weights the weights structure of every observation using row index
 * @returns WeightsMeta
 */
export function getMetaFromWeights(weights: number[][], isDistanceWeights = false): WeightsMeta {
  const n = weights.length;

  let minNeighbors = Infinity;
  let maxNeighbors = 0;
  let meanNeighbors = 0;
  let medianNeighbors = 0;
  let sumofNeighbors = 0;
  let pctNoneZero = 0;

  if (isDistanceWeights) {
    for (let i = 0; i < weights.length; i++) {
      const len = weights[i].length / 2;
      if (len < minNeighbors) minNeighbors = len;
      if (len > maxNeighbors) maxNeighbors = len;
      sumofNeighbors += len;
    }
    meanNeighbors = sumofNeighbors / n;
    pctNoneZero = sumofNeighbors / (n * n);
    medianNeighbors = weights.map(w => w.length / 2).sort((a, b) => a - b)[Math.floor(n / 2)];
  } else {
    for (let i = 0; i < weights.length; i++) {
      const len = isDistanceWeights ? weights[i].length / 2 : weights[i].length;
      if (len < minNeighbors) minNeighbors = len;
      if (len > maxNeighbors) maxNeighbors = len;
      sumofNeighbors += len;
    }

    meanNeighbors = sumofNeighbors / n;
    pctNoneZero = sumofNeighbors / (n * n);
    medianNeighbors = weights.map(w => w.length).sort((a, b) => a - b)[Math.floor(n / 2)];
  }

  return {
    numberOfObservations: n,
    minNeighbors,
    maxNeighbors,
    meanNeighbors,
    medianNeighbors,
    pctNoneZero
  };
}
