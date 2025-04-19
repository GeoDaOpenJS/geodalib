#ifndef GEODA_SPATIAL_DISSOLVE_H
#define GEODA_SPATIAL_DISSOLVE_H

#include "geometry/geometry.h"
#include "geometry/polygon.h"

namespace geoda {

Polygon spatial_dissolve(const PolygonCollection& polys);

}  // namespace geoda

#endif  // GEODA_SPATIAL_DISSOLVE_H
