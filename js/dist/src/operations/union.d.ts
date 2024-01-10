import { Feature, Polygon, MultiPolygon } from 'geojson';
import { CustomEmbindModule } from '../../wasm';
export declare function spatialMerge(polygons: Feature<Polygon | MultiPolygon>[]): Promise<Feature>;
export declare function spatialMergeSync(polygons: Feature<Polygon | MultiPolygon>[], wasmInstance?: CustomEmbindModule): Feature;
