

export type {CustomEmbindModule as GeoDaInterface} from '../wasm';

export {
  initWASM as initGeoDa,
  resetWASM as resetGeoDa,
  setWASM as setGeoDa,
  getWASM as getGeoDa
} from './init';

export * from './operations/centroids';
export * from './operations/buffer';
export {SpatialJoinType, spatialJoin} from './operations/join';
export {parallelSpatialJoin} from './operations/parallel-join';
export {spatialMerge, spatialMergeSync} from './operations/union';
export type {SpatialCountPointInput} from './operations/count';
export {spatialCount} from './operations/count';

export {getNearestNeighbors} from './weights/nearest-neighbors';
export * from './weights/distance-based-neighbors';

export type {LocalMoranResultType} from './statistics/local-moran';
export {localMoran} from './statistics/local-moran';

export type {GeometryInput as SpatialJoinInput} from './features/geometry';
