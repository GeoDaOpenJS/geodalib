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
export function getMetaFromWeights(weights: number[][]): WeightsMeta {
  const n = weights.length;
  const minNeighbors = Math.min(...weights.map(w => w.length));
  const maxNeighbors = Math.max(...weights.map(w => w.length));
  const meanNeighbors = weights.reduce((acc, w) => acc + w.length, 0) / n;
  const medianNeighbors = weights.map(w => w.length).sort((a, b) => a - b)[Math.floor(n / 2)];
  const sumofNeighbors = weights.reduce((acc, w) => acc + w.length, 0);
  const pctNoneZero = sumofNeighbors / (n * n);

  return {
    numberOfObservations: n,
    minNeighbors,
    maxNeighbors,
    meanNeighbors,
    medianNeighbors,
    pctNoneZero
  };
}
