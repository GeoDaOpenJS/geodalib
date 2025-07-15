// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project


#ifdef __EMCC__
#include <emscripten/bind.h>

#include <iostream>

#include "geometry/geometry.h"
#include "geometry/spatial-join.h"
#include "mapping/mapping.h"
#include "regression/diagnostic-report.h"
#include "regression/regression.h"
#include "sa/lisa-api.h"
#include "weights/weights.h"

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

  emscripten::class_<DiagnosticReport>("DiagnosticReport")
      .function("GetNoObservation", &DiagnosticReport::GetNoObservation)
      .function("GetNoVariable", &DiagnosticReport::GetNoVariable)
      .function("IncludeConstant", &DiagnosticReport::IncludeConstant)
      .function("GetXVarName", &DiagnosticReport::GetXVarName)
      .function("GetCoefficient", &DiagnosticReport::GetCoefficient)
      .function("GetStdError", &DiagnosticReport::GetStdError)
      .function("GetZValue", &DiagnosticReport::GetZValue)
      .function("GetProbability", &DiagnosticReport::GetProbability)
      .function("GetR2", &DiagnosticReport::GetR2)
      .function("GetR2_adjust", &DiagnosticReport::GetR2_adjust)
      .function("GetR2_buse", &DiagnosticReport::GetR2_buse)
      .function("GetLIK", &DiagnosticReport::GetLIK)
      .function("GetAIC", &DiagnosticReport::GetAIC)
      .function("GetOLS_SC", &DiagnosticReport::GetOLS_SC)
      .function("GetRSS", &DiagnosticReport::GetRSS)
      //   .function("GetRho", &DiagnosticReport::GetRho)
      .function("GetFtest", &DiagnosticReport::GetFtest)
      .function("GetFtestProb", &DiagnosticReport::GetFtestProb)
      .function("GetSIQ_SQ", &DiagnosticReport::GetSIQ_SQ)
      .function("GetSIQ_SQLM", &DiagnosticReport::GetSIQ_SQLM)
      .function("GetConditionNumber", &DiagnosticReport::GetConditionNumber)
      .function("GetJBtest", &DiagnosticReport::GetJBtestValue)
      .function("GetBPtest", &DiagnosticReport::GetBPtestValue)
      .function("GetSpatialBPtest", &DiagnosticReport::GetSpatialBPtestValue)
      .function("GetKBtest", &DiagnosticReport::GetKBtestValue)
      .function("GetMoranI", &DiagnosticReport::GetMoranIValue)
      .function("GetLMLAG", &DiagnosticReport::GetLMLAGValue)
      .function("GetLMLAGRob", &DiagnosticReport::GetLMLAGRobValue)
      .function("GetLMERR", &DiagnosticReport::GetLMERRValue)
      .function("GetLMERRRob", &DiagnosticReport::GetLMERRRobValue)
      .function("GetLMSarma", &DiagnosticReport::GetLMSarmaValue)
      .function("GetKelRobin", &DiagnosticReport::GetKelRobinValue)
      .function("GetMeanY", &DiagnosticReport::GetMeanY)
      .function("GetSDevY", &DiagnosticReport::GetSDevY)
      .function("GetLRTestValue", &DiagnosticReport::GetLRTestValue);

  emscripten::function("dotProduct", &geoda::dot_product);
  emscripten::function("linearRegression", &geoda::ols);
  emscripten::function("spatialLag", &geoda::spatial_lag);
  emscripten::function("spatialError", &geoda::spatial_error);
}
#endif
