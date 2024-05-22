#include "lisa/UniGeary.h"
#include "lisa/MultiGeary.h"
#include "sa/lisa-api.h"
#include "weights/geoda-weight.h"
#include "weights/vector-weight.h"

geoda::LisaResult geoda::local_geary(const std::vector<double>& data,
                                     const std::vector<std::vector<unsigned int>>& neighbors,
                                     const std::vector<unsigned int>& undefs, double significance_cutoff,
                                     unsigned int perm, int last_seed) {
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
  std::string perm_method = "complete";
  // create a GeoDaWeight object from neighbors vector
  GeoDaWeight* w = new VectorWeight(neighbors);

  UniGeary* lisa =
      new UniGeary(num_obs, w, data, copy_undefs, significance_cutoff, nCPUs, perm, perm_method, last_seed);

  if (lisa) {
    set_lisa_content(lisa, result);
    delete lisa;
  }

  if (w) {
    delete w;
  }

  return result;
}

geoda::LisaResult geoda::local_multivariate_geary(const std::vector<std::vector<double>>& data,
                                                  const std::vector<std::vector<unsigned int>>& neighbors,
                                                  const std::vector<std::vector<unsigned int>>& undefs,
                                                  double significance_cutoff, unsigned int perm, int last_seed) {
  LisaResult result;
  result.is_valid = false;

  size_t num_obs = neighbors.size();

  std::vector<std::vector<bool>> copy_undefs(data.size());
  for (size_t i = 0; i < data.size(); ++i) {
    copy_undefs[i].resize(data[i].size(), false);
    if (undefs[i].size() == num_obs) {
      for (size_t j = 0; j < data[i].size(); ++j) {
        copy_undefs[i][j] = undefs[i][j] == 0 ? false : true;
      }
    }
  }

  int nCPUs = 1;
  std::string perm_method = "LookupTable";
  // create a GeoDaWeight object from neighbors vector
  GeoDaWeight* w = new VectorWeight(neighbors);

  MultiGeary* lisa =
      new MultiGeary(num_obs, w, data, copy_undefs, significance_cutoff, nCPUs, perm, perm_method, last_seed);

  if (lisa) {
    set_lisa_content(lisa, result);
    delete lisa;
  }

  if (w) {
    delete w;
  }

  return result;
}
