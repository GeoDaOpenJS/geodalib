// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

#ifndef GEODA_SPATIAL_JOIN_H
#define GEODA_SPATIAL_JOIN_H

#include <vector>

#include "geometry/geometry.h"

namespace geoda {
// spatial join with intersection (no other join types are supported at the moment)
std::vector<std::vector<unsigned int>> spatial_join(const GeometryCollection& left, const GeometryCollection& right);
}  // namespace geoda

#endif  // GEODA_SPATIAL_JOIN_H
