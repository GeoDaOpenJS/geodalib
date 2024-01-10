import { Feature } from 'geojson';
import { CustomEmbindModule } from '../../wasm';
import { DistanceUnit } from '../weights/distance-based-neighbors';
export declare function getBuffersSync(features: Array<Feature | null>, bufferDistance: number, distanceUnit: DistanceUnit, pointsPerCircle: number, wasmInstance?: CustomEmbindModule): Array<Feature | null>;
export declare function getBufferSync(feature: Feature, bufferDistance: number, distanceUnit: DistanceUnit, pointsPerCircle: number, wasmInstance?: CustomEmbindModule): Feature | null;
