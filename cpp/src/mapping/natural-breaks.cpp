#include <boost/algorithm/string.hpp>
#include <boost/math/distributions/students_t.hpp>
#include <boost/random.hpp>
#include <boost/random/uniform_01.hpp>

#include "mapping/mapping.h"

struct UniqueValElem {
  UniqueValElem(double v, int f, int l) : val(v), first(f), last(l) {}
  double val;  // value
  int first;   // index of first occurrance
  int last;    // index of last occurrance
};

/** clears uv_mapping and resizes as needed */
void create_unique_val_mapping(std::vector<UniqueValElem>& uv_mapping, const std::vector<double>& v,
                               const std::vector<bool>& v_undef) {
  uv_mapping.clear();
  int cur_ind = -1;

  for (int i = 0, iend = v.size(); i < iend; i++) {
    if (v_undef[i]) continue;
    if (uv_mapping.empty()) {
      cur_ind++;
      uv_mapping.push_back(UniqueValElem(v[i], i, i));
    } else {
      if (uv_mapping[cur_ind].val != v[i]) {
        uv_mapping[cur_ind].last = i - 1;
        cur_ind++;
        uv_mapping.push_back(UniqueValElem(v[i], i, i));
      }
    }
  }
}

// implementation of natural breaks
std::vector<double> geoda::natural_breaks(int num_cats, const std::vector<double>& data,
                                          const std::vector<bool>& _undef) {
  int num_obs = data.size();
  std::vector<bool> undef(num_obs, 0);

  if (_undef.size() > 0) {
    for (int i = 0; i < _undef.size(); ++i) {
      undef[i] = _undef[i] == 1;
    }
  }

  std::vector<std::pair<double, int> > var;
  for (int i = 0; i < num_obs; ++i) {
    var.push_back(std::make_pair(data[i], i));
  }
  std::sort(var.begin(), var.end(), geoda::dbl_int_pair_cmp_less);

  std::vector<double> v(num_obs);
  std::vector<double> v_undef(num_obs);
  for (int i = 0; i < num_obs; i++) {
    v[i] = var[i].first;
    int ind = var[i].second;
    v_undef[i] = undef[ind];
  }

  std::vector<UniqueValElem> uv_mapping;
  create_unique_val_mapping(uv_mapping, v, undef);

  int num_unique_vals = uv_mapping.size();
  int t_cats = std::min(num_unique_vals, num_cats);

  double mean = 0, max_val;
  int valid_obs = 0;
  for (int i = 0; i < num_obs; i++) {
    double val = var[i].first;
    int ind = var[i].second;
    if (i == 0 || val > max_val) max_val = val;
    if (undef[ind]) continue;
    mean += val;
    valid_obs += 1;
  }
  mean /= static_cast<double>(valid_obs);

  double gssd = 0;
  for (int i = 0; i < num_obs; i++) {
    double val = var[i].first;
    int ind = var[i].second;
    if (undef[ind]) continue;
    gssd += (val - mean) * (val - mean);
  }

  std::vector<int> rand_b(t_cats - 1);
  std::vector<int> best_breaks(t_cats - 1);
  std::vector<int> uv_rand_b(t_cats - 1);

  double max_gvf_found = 0;
  int max_gvf_ind = 0;

  // for 5000 permutations, 2200 obs, and 4 time periods, slow enough
  // make sure permutations is such that this total is not exceeded.
  double c = 5000 * 2200 * 4;
  int perms = c / static_cast<double>(valid_obs);
  if (perms < 10) perms = 10;
  if (perms > 10000) perms = 10000;

  boost::mt19937 rng(GdaConst::gda_user_seed);
  boost::uniform_01<boost::mt19937> X(rng);

  for (int i = 0; i < perms; i++) {
    pick_rand_breaks(uv_rand_b, num_unique_vals, X);
    // translate uv_rand_b into normal breaks
    unique_to_normal_breaks(uv_rand_b, uv_mapping, rand_b);
    double new_gvf = calc_gvf(rand_b, v, gssd);
    if (new_gvf > max_gvf_found) {
      max_gvf_found = new_gvf;
      max_gvf_ind = i;
      best_breaks = rand_b;
    }
  }

  std::vector<double> nat_breaks;
  nat_breaks.resize(best_breaks.size());
  for (int i = 0, iend = best_breaks.size(); i < iend; i++) {
    nat_breaks[i] = var[best_breaks[i]].first;
  }

  return nat_breaks;
}
