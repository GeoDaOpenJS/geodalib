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
  let minNeighbors = Math.min(...weights.map(w => w.length));
  let maxNeighbors = Math.max(...weights.map(w => w.length));
  let meanNeighbors = weights.reduce((acc, w) => acc + w.length, 0) / n;
  let medianNeighbors = weights.map(w => w.length).sort((a, b) => a - b)[Math.floor(n / 2)];
  let sumofNeighbors = weights.reduce((acc, w) => acc + w.length, 0);
  let pctNoneZero = sumofNeighbors / (n * n);

  if (isDistanceWeights) {
    minNeighbors = Math.min(...weights.map(w => w.length / 2));
    maxNeighbors = Math.max(...weights.map(w => w.length / 2));
    meanNeighbors = weights.reduce((acc, w) => acc + w.length / 2, 0) / n;
    medianNeighbors = weights.map(w => w.length / 2).sort((a, b) => a - b)[Math.floor(n / 2)];
    sumofNeighbors = weights.reduce((acc, w) => acc + w.length / 2, 0);
    pctNoneZero = sumofNeighbors / (n * n);
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
