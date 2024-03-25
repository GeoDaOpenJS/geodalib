
#ifdef __EMCC__
#include <emscripten/bind.h>

#include <iostream>

#include "geometry/geometry.h"
#include "sa/lisa.h"
#include "weights/weights.h"
#include "mapping/mapping.h"
#include "regression/diagnostic-report.h"
#include "regression/regression.h"

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
  emscripten::register_vector<std::string>("VectorString");

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
  emscripten::function("getPolygonContiguityWeights", &geoda::polygon_contiguity_weights);
  emscripten::function("getPointContiguityWeights", &geoda::point_contiguity_weights);

  emscripten::function("localMoran", &geoda::local_moran);

  emscripten::function("quantileBreaks", &geoda::quantile_breaks);
  emscripten::function("naturalBreaks", &geoda::natural_breaks);

  emscripten::class_<DiagnosticReport>("DiagnosticReport")
      .smart_ptr<std::shared_ptr<DiagnosticReport>>("DiagnosticReport");
      .function("GetNoObservation", &DiagnosticReport::GetNoObservation)
      .function("GetNoVariable", &DiagnosticReport::GetNoVariable)
      .function("IncludeConstant", &DiagnosticReport::IncludeConstant)
      .function("GetXVarName", &DiagnosticReport::GetXVarName)
      .function("GetCoefficients", &DiagnosticReport::GetCoefficientsVec)
      .function("GetCoefficient", &DiagnosticReport::GetCoefficient)
      .function("GetStdErrors", &DiagnosticReport::GetStdErrorsVec)
      .function("GetStdError", &DiagnosticReport::GetStdError)
      .function("GetZValues", &DiagnosticReport::GetZValuesVec)
      .function("GetZValue", &DiagnosticReport::GetZValue)
      .function("GetProbabilities", &DiagnosticReport::GetProbabilitiesVec)
      .function("GetProbability", &DiagnosticReport::GetProbability)
      .function("GetRho", &DiagnosticReport::GetRhoVec)
      .function("GetLambda", &DiagnosticReport::GetLambdaVec)
      .function("GetR2", &DiagnosticReport::GetR2)
      .function("GetR2_adjust", &DiagnosticReport::GetR2_adjust)
      .function("GetR2_buse", &DiagnosticReport::GetR2_buse)
      .function("GetLIK", &DiagnosticReport::GetLIK)
      .function("GetAIC", &DiagnosticReport::GetAIC)
      .function("GetOLS_SC", &DiagnosticReport::GetOLS_SC)
      .function("GetRSS", &DiagnosticReport::GetRSS)
      .function("GetFtest", &DiagnosticReport::GetFtest)
      .function("GetFtestProb", &DiagnosticReport::GetFtestProb)
      .function("GetSIQ_SQ", &DiagnosticReport::GetSIQ_SQ)
      .function("GetSIQ_SQLM", &DiagnosticReport::GetSIQ_SQLM)
      .function("GetConditionNumber", &DiagnosticReport::GetConditionNumber)
      .function("GetJBtest", &DiagnosticReport::GetJBtestVec)
      .function("GetBPtest", &DiagnosticReport::GetBPtestVec)
      .function("GetSpatialBPtest", &DiagnosticReport::GetSpatialBPtestVec)
      .function("GetKBtest", &DiagnosticReport::GetKBtestVec)
      .function("GetWhitetest", &DiagnosticReport::GetWhitetestVec)
      .function("GetMoranI", &DiagnosticReport::GetMoranIVec)
      .function("GetLMLAG", &DiagnosticReport::GetLMLAGVec)
      .function("GetLMLAGRob", &DiagnosticReport::GetLMLAGRobVec)
      .function("GetLMERR", &DiagnosticReport::GetLMERRVec)
      .function("GetLMERRRob", &DiagnosticReport::GetLMERRRobVec)
      .function("GetLMSarma", &DiagnosticReport::GetLMSarmaVec)
      .function("GetKelRobin", &DiagnosticReport::GetKelRobinVec)
      .function("GetResidual", &DiagnosticReport::GetResidualVec)
      .function("GetCovariance", &DiagnosticReport::GetCovarianceVec)
      .function("GetCovariance", &DiagnosticReport::GetCovariance)
      .function("GetEigVal", &DiagnosticReport::GetEigValVec)
      .function("GetYHAT", &DiagnosticReport::GetYHATVec)
      .function("GetPredError", &DiagnosticReport::GetPredErrorVec)
      .function("GetLRTest", &DiagnosticReport::GetLRTestVec)
      .function("GetLMTest", &DiagnosticReport::GetLMTestVec)
      .function("GetLRTest_CF", &DiagnosticReport::GetLRTest_CFVec)
      .function("GetWaldTest", &DiagnosticReport::GetWaldTestVec)
      .function("GetMeanY", &DiagnosticReport::GetMeanY)
      .function("GetSDevY", &DiagnosticReport::GetSDevY);

  emscripten::function("dotProduct", &geoda::dot_product);
  emscripten::function("linearRegression", &geoda::linear_regression);
}
#endif
