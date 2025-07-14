// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

#include <fstream>
#include <iostream>
#include <list>
#include <map>

#ifdef __WIN32__
#include <cstdlib>
#endif

#include "./geoda-weight.h"

GeoDaWeight::GeoDaWeight(const GeoDaWeight& gw) { GeoDaWeight::operator=(gw); }

const GeoDaWeight& GeoDaWeight::operator=(const GeoDaWeight& gw) {
  weight_type = gw.weight_type;
  wflnm = gw.wflnm;
  id_field = gw.id_field;
  title = gw.title;
  symmetry_checked = gw.symmetry_checked;
  is_symmetric = gw.is_symmetric;
  num_obs = gw.num_obs;
  sparsity = gw.sparsity;
  min_nbrs = gw.min_nbrs;
  max_nbrs = gw.max_nbrs;
  mean_nbrs = gw.mean_nbrs;
  median_nbrs = gw.median_nbrs;
  is_internal_use = gw.is_internal_use;
  uid = gw.uid;

  return *this;
}

std::string GeoDaWeight::GetTitle() const { return title; }

bool GeoDaWeight::IsSymmetric() const { return is_symmetric; }
double GeoDaWeight::GetSparsity() const { return sparsity; }
int GeoDaWeight::GetNumObs() const { return num_obs; }

int GeoDaWeight::GetMinNbrs() const { return min_nbrs; }
int GeoDaWeight::GetMaxNbrs() const { return max_nbrs; }
double GeoDaWeight::GetMeanNbrs() const { return mean_nbrs; }
double GeoDaWeight::GetMedianNbrs() const { return median_nbrs; }

bool GeoDaWeight::CheckConnectivity() {
  // start from first node in W
  const std::vector<unsigned int>& nbrs = GetNeighbors(0);
  if (nbrs.empty()) return false;

  std::map<int, bool> access_dict;  // prevent loop
  access_dict[0] = true;

  std::list<int> magzine;
  for (int i = 0; i < nbrs.size(); i++) {
    if (access_dict.find(nbrs[i]) == access_dict.end()) {
      magzine.push_back(nbrs[i]);
      access_dict[nbrs[i]] = true;
    }
  }
  // breadth first traversal (BFS)
  while (!magzine.empty()) {
    int nbr = magzine.front();
    magzine.pop_front();
    const std::vector<unsigned int>& tmp_nbrs = GetNeighbors(nbr);
    for (int i = 0; i < tmp_nbrs.size(); i++) {
      if (access_dict.find(tmp_nbrs[i]) == access_dict.end()) {
        magzine.push_back(tmp_nbrs[i]);
        access_dict[tmp_nbrs[i]] = true;
      }
    }
  }

  if (access_dict.size() < num_obs) {
    // check every one that is not connected via BFS,
    for (int i = 0; i < num_obs; i++) {
      if (access_dict.find(i) == access_dict.end()) {
        bool rev_conn = false;
        // then manually check if this one is connected
        const std::vector<unsigned int>& tmp_nbrs = GetNeighbors(i);
        for (int j = 0; j < tmp_nbrs.size(); j++) {
          if (access_dict.find(tmp_nbrs[j]) != access_dict.end()) {
            rev_conn = true;
            break;
          }
        }
        if (rev_conn == false) {
          // any one is checked being not connected, return false
          return false;
        }
      }
    }
  }

  return true;
}
