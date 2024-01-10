
#ifdef __EMCC__
#include <emscripten/bind.h>

#include <iostream>

#include "geometry/geometry.h"
#include "sa/lisa.h"
#include "weights/weights.h"
#include "mapping/mapping.h"

template <typename T>
emscripten::class_<std::vector<T>> register_vector_with_smart_ptrs(const char* name) {
  typedef std::vector<T> VecType;
  void (VecType::*push_back)(const T&) = &VecType::push_back;
  void (VecType::*resize)(const size_t, const T&) = &VecType::resize;
  return emscripten::class_<VecType>(name)
      .template constructor<>()
      .template smart_ptr<std::shared_ptr<VecType>>(name)
      .function("push_back", push_back)
      .function("resize", resize)
      .function("size", &VecType::size)
      .function("get", &emscripten::internal::VectorAccess<VecType>::get)
      .function("set", &emscripten::internal::VectorAccess<VecType>::set);
}

EMSCRIPTEN_BINDINGS(wasmgeoda) {
  emscripten::register_vector<unsigned int>("VectorUInt");
  emscripten::register_vector<std::vector<unsigned int>>("VecVecUInt");
  emscripten::register_vector<int>("VectorInt");
  emscripten::register_vector<std::vector<int>>("VecVecInt");
  emscripten::register_vector<double>("VectorDouble");
  emscripten::register_vector<std::vector<double>>("VecVecDouble");

  emscripten::class_<geoda::GeometryCollection>("GeometryCollection");
  emscripten::class_<geoda::PolygonCollection, emscripten::base<geoda::GeometryCollection>>("PolygonCollection")
      .constructor<std::vector<double>, std::vector<double>, std::vector<unsigned int>, std::vector<unsigned int>,
                   std::vector<unsigned int>, bool, bool>()
      .function("getCentroids", &geoda::PolygonCollection::get_centroids);
  emscripten::class_<geoda::LineCollection, emscripten::base<geoda::GeometryCollection>>("LineCollection")
      .constructor<std::vector<double>, std::vector<double>, std::vector<unsigned int>, std::vector<unsigned int>,
                   bool>()
      .function("getCentroids", &geoda::LineCollection::get_centroids);
  emscripten::class_<geoda::PointCollection, emscripten::base<geoda::GeometryCollection>>("PointCollection")
      .constructor<std::vector<double>, std::vector<double>, std::vector<unsigned int>, std::vector<unsigned int>,
                   bool>()
      .function("getCentroids", &geoda::PointCollection::get_centroids);

  emscripten::class_<geoda::Point>("Point")
      .constructor()
      .function("getX", &geoda::Polygon::get_x)
      .function("getY", &geoda::Polygon::get_y);

  emscripten::class_<geoda::Polygon>("Polygon")
      .constructor()
      .function("getX", &geoda::Polygon::get_x)
      .function("getY", &geoda::Polygon::get_y)
      .function("getHoles", &geoda::Polygon::get_holes)
      .function("getParts", &geoda::Polygon::get_parts)
      .function("addPart", &geoda::Polygon::add);

  emscripten::register_vector<geoda::Polygon>("VectorPolygon");

  emscripten::class_<geoda::LisaResult>("LisaResult")
      .function("isValid", &geoda::LisaResult::get_is_valid)
      .function("getPValues", &geoda::LisaResult::get_pvalues)
      .function("getClusters", &geoda::LisaResult::get_clusters)
      .function("getLagValues", &geoda::LisaResult::get_lags)
      .function("getLisaValues", &geoda::LisaResult::get_lisas);

  emscripten::function("getNearestNeighbors", &geoda::knearest_neighbors);
  emscripten::function("getDistanceWeights", &geoda::distance_weights);
  emscripten::function("getDistanceThresholds", &geoda::get_distance_thresholds);
  emscripten::function("localMoran", &geoda::local_moran);

  emscripten::function("quantileBreaks", &geoda::quantile_breaks);
  emscripten::function("naturalBreaks", &geoda::natural_breaks);
}
#endif
