import { Feature, MultiPolygon, Polygon, Point } from 'geojson';
export declare function getCentroids(polygons: Feature<Polygon | MultiPolygon>[]): Promise<Array<Feature<Point> | null>>;
export declare function getCentroid(feature: Feature | null): Array<number> | null;
export declare function getGeojsonCentroids(features: Array<Feature | null>): Array<Array<number> | null>;
