import { Polygon, MultiPolygon, Point, Feature } from 'geojson';
export type SpatialCountPointInput = {
    features: Feature<Point>[] | null;
    latitudes: number[] | null;
    longitudes: number[] | null;
};
export declare function spatialCount(polygons: Feature<Polygon | MultiPolygon>[], points: SpatialCountPointInput): Promise<number[]>;
