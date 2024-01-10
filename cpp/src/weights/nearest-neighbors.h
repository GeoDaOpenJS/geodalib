

#ifndef GEODA_NEAREST_NEIGHBORS_H
#define GEODA_NEAREST_NEIGHBORS_H
#include <vector>

#include "../features/geometry-collection.h"

namespace geoda {

/**
 * k-nearest neighbors
 */
std::vector<std::vector<unsigned int>> knearest_neighbors(const GeometryCollection& geoms, unsigned int k);

}  // namespace geoda
#endif  // GEODA_NEAREST_NEIGHBORS_H
