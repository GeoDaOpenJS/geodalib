

#include <boost/geometry.hpp>

#include "operations/operations.h"

using namespace geoda;

std::vector<std::vector<double>> geoda::get_centroids(const GeometryCollection& geomCollection) {
  int num_geoms = geomCollection.size();
  std::vector<std::vector<double>> centroids(num_geoms);

  for (int i = 0; i < num_geoms; ++i) {
    point_type pt;
    try {
      if (geomCollection.get_centroid(i, pt) == geoda::TRUE) {
        centroids[i].push_back(pt.x());
        centroids[i].push_back(pt.y());
      }
    } catch (boost::geometry::centroid_exception) {
      // do nothing, just prevent crash since centroids[i] is empty
      // will tell if get_centroid() is failed.
    }
  }

  return centroids;
}
