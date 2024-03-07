export type {GeoDaModule as GeoDaInterface} from '../wasm';

export {
  initWASM as initGeoDa,
  resetWASM as resetGeoDa,
  setWASM as setGeoDa,
  getWASM as getGeoDa
} from './init';

export {getNearestNeighborsFromBinaryGeometries} from './weights/nearest-neighbors';
export {getContiguityNeighborsFromBinaryGeometries} from './weights/contiguity-neighbors';
export * from './weights/weights-stats';

export type {LocalMoranResult as LocalMoranResultType} from './sa/local-moran';
export {localMoran} from './sa/local-moran';

export {createPointCollectionFromBinaryFeatures as createGeoDaPointsFromBinaryFeatures} from './geometry/binary-geometry';
export {quantileBreaks} from './mapping/quantile';
export {naturalBreaks} from './mapping/natural-breaks';
