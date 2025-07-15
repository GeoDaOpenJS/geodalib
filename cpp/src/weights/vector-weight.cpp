// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

#include "weights/vector-weight.h"

#include <algorithm>
#include <iostream>
#include <map>
#include <string>

using namespace geoda;

VectorWeight::VectorWeight(const std::vector<std::vector<unsigned int>>& neighbors) : gal(0) {
  weight_type = gal_type;
  // Create a new GalElement object using the neighbors vector
  this->num_obs = neighbors.size();
  this->sparsity = 0;
  this->min_nbrs = 0;
  this->max_nbrs = 0;
  this->mean_nbrs = 0;
  this->median_nbrs = 0;
  this->is_internal_use = true;

  this->gal = new GalElement[num_obs];
  for (size_t i = 0; i < num_obs; ++i) {
    this->gal[i].SetSizeNbrs(neighbors[i].size());
    for (size_t j = 0; j < neighbors[i].size(); ++j) {
      this->gal[i].SetNbr(j, neighbors[i][j]);
    }
  }

  this->GetNbrStats();
}

VectorWeight::VectorWeight(const VectorWeight& gw) : GeoDaWeight(gw) {
  weight_type = gw.weight_type;
  VectorWeight::operator=(gw);
}

VectorWeight& VectorWeight::operator=(const VectorWeight& gw) {
  if (this != &gw) {
    weight_type = gw.weight_type;
    gal = new GalElement[gw.num_obs];

    for (int i = 0; i < gw.num_obs; ++i) {
      gal[i].SetNbrs(gw.gal[i]);
    }

    this->num_obs = gw.num_obs;
    this->wflnm = gw.wflnm;
    this->id_field = gw.id_field;
    this->GetNbrStats();
  }
  return *this;
}

bool VectorWeight::HasIsolates() {
  // Implement the HasIsolates function here
  if (!gal) {
    return false;
  }
  for (int i = 0; i < num_obs; i++) {
    if (gal[i].Size() <= 0) {
      return true;
    }
  }
  return false;
}

void VectorWeight::Update(const std::vector<bool>& undefs) {
  for (int i = 0; i < num_obs; ++i) {
    gal[i].Update(undefs);
  }
}

bool VectorWeight::CheckNeighbor(int obs_idx, int nbr_idx) { return gal[obs_idx].Check(nbr_idx); }

const std::vector<unsigned int> VectorWeight::GetNeighbors(int obs_idx) { return gal[obs_idx].GetNbrs(); }

const std::vector<double> VectorWeight::GetNeighborWeights(int obs_idx) { return gal[obs_idx].GetNbrWeights(); }

void VectorWeight::GetNbrStats() {
  // other
  int sum_nnbrs = 0;
  std::vector<int> nnbrs_array;
  std::map<int, int> e_dict;

  for (int i = 0; i < num_obs; i++) {
    int n_nbrs = 0;
    const std::vector<unsigned int>& nbrs = gal[i].GetNbrs();
    for (size_t j = 0; j < nbrs.size(); j++) {
      int nbr = nbrs[j];
      if (i != nbr) {
        n_nbrs++;
        e_dict[i] = nbr;
        e_dict[nbr] = i;
      }
    }
    sum_nnbrs += n_nbrs;
    if (i == 0 || n_nbrs < min_nbrs) min_nbrs = n_nbrs;
    if (i == 0 || n_nbrs > max_nbrs) max_nbrs = n_nbrs;
    nnbrs_array.push_back(n_nbrs);
  }
  // double n_edges = e_dict.size() / 2.0;
  // std::cout << sum_nnbrs << "/" << (double)(num_obs * num_obs) << std::endl;
  sparsity = sum_nnbrs / (num_obs * num_obs);

  if (num_obs > 0) mean_nbrs = sum_nnbrs / num_obs;
  std::sort(nnbrs_array.begin(), nnbrs_array.end());
  if (num_obs % 2 == 0) {
    median_nbrs = (nnbrs_array[num_obs / 2 - 1] + nnbrs_array[num_obs / 2]) / 2.0;
  } else {
    median_nbrs = nnbrs_array[num_obs / 2];
  }
}

int VectorWeight::GetNbrSize(int obs_idx) { return gal[obs_idx].Size(); }

double VectorWeight::SpatialLag(int obs_idx, const std::vector<double>& data) { return gal[obs_idx].SpatialLag(data); }

bool VectorWeight::Save(const char* ofname, const char* layer_name, const char* id_var_name,
                        const std::vector<int>& id_vec) {
  // Implement the Save function here
  throw std::runtime_error("VectorWeight::Save() Not implemented");
}

bool VectorWeight::Save(const char* ofname, const char* layer_name, const char* id_var_name,
                        const std::vector<std::string>& id_vec) {
  // Implement the Save function here
  throw std::runtime_error("VectorWeight::Save() Not implemented");
}

void VectorWeight::SetNeighbors(int id, const std::vector<int>& nbr_ids) {
  if (id < 0 || id >= this->num_obs) {
    return;
  }

  int num_nbrs = nbr_ids.size();

  if (num_nbrs <= 0 || num_nbrs > num_obs - 1) {
    return;
  }

  this->gal[id].SetSizeNbrs(num_nbrs, true);

  for (int i = 0; i < num_nbrs; ++i) {
    if (nbr_ids[i] < 0 || nbr_ids[i] > num_obs - 1 || nbr_ids[i] == id) {
      continue;
    }
    this->gal[id].SetNbr(i, nbr_ids[i]);
  }
}

void VectorWeight::SetNeighborsAndWeights(int id, const std::vector<int>& nbr_ids, const std::vector<double>& w) {
  if (id < 0 || id >= this->num_obs) {
    return;
  }

  int num_nbrs = nbr_ids.size();

  if (num_nbrs <= 0 || num_nbrs > num_obs - 1) {
    return;
  }

  this->gal[id].SetSizeNbrs(num_nbrs, w.empty());

  for (int i = 0; i < num_nbrs; ++i) {
    if (nbr_ids[i] < 0 || nbr_ids[i] > num_obs - 1 || nbr_ids[i] == id) {
      continue;
    }
    if (w.empty()) {
      this->gal[id].SetNbr(i, nbr_ids[i]);
    } else {
      this->gal[id].SetNbr(i, nbr_ids[i], w[i]);
    }
  }
}
