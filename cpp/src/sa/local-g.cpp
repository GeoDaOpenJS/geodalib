// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

#include "lisa/UniG.h"
#include "lisa/UniGstar.h"
#include "sa/lisa-api.h"
#include "weights/vector-weight.h"

geoda::LisaResult geoda::local_g(const std::vector<double>& data,
                                 const std::vector<std::vector<unsigned int>>& neighbors,
                                 const std::vector<unsigned int>& undefs, double significance_cutoff, unsigned int perm,
                                 int last_seed, int is_gstar) {
  LisaResult result;
  result.is_valid = false;

  size_t num_obs = neighbors.size();
  std::vector<bool> copy_undefs;
  copy_undefs.resize(num_obs, false);
  if (undefs.size() == num_obs) {
    for (size_t i = 0; i < num_obs; ++i) {
      if (undefs[i] == 1) {
        copy_undefs[i] = true;
      }
    }
  }
  int nCPUs = 1;
  // note: crash when using LookupTable for localG
  std::string perm_method = "complete";
  // create a GeoDaWeight object from neighbors vector
  GeoDaWeight* w = new VectorWeight(neighbors);

  if (is_gstar) {
    UniGstar* lisa =
        new UniGstar(num_obs, w, data, copy_undefs, significance_cutoff, nCPUs, perm, perm_method, last_seed);
    if (lisa) {
      set_lisa_content(lisa, result);
      delete lisa;
    }
  } else {
    UniG* lisa = new UniG(num_obs, w, data, copy_undefs, significance_cutoff, nCPUs, perm, perm_method, last_seed);

    if (lisa) {
      set_lisa_content(lisa, result);
      delete lisa;
    }
  }

  if (w) {
    delete w;
  }

  return result;
}
