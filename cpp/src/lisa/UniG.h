// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

//
// Created by Xun Li on 10/1/19.
//

#ifndef GEODA_UNIG_H
#define GEODA_UNIG_H

#include <vector>
#include <string>

#include "LISA.h"

class GeoDaWeight;

class UniG : public LISA {
  const unsigned int CLUSTER_NOT_SIG;
  const unsigned int CLUSTER_HIGHHIGH;
  const unsigned int CLUSTER_LOWLOW;
  const unsigned int CLUSTER_UNDEFINED;
  const unsigned int CLUSTER_NEIGHBORLESS;

 public:
  UniG(int num_obs, GeoDaWeight* w, const std::vector<double>& data, const std::vector<bool>& undefs,
       double significance_cutoff, int nCPUs, int permutations, const std::string& _permutation_method,
       uint64_t last_seed_used);

  virtual ~UniG();

  virtual void ComputeLoalSA();

  virtual void PermLocalSA(int cnt, int perm, const std::vector<int>& permNeighbors, std::vector<double>& permutedSA);

  virtual void PermLocalSA(int cnt, int perm, int numNeighbors, const int* permNeighbors,
                           std::vector<double>& permutedSA);

  virtual uint64_t CountLargerSA(int cnt, const std::vector<double>& permutedSA);

  virtual std::vector<int> GetClusterIndicators();

 protected:
  std::vector<double> data;

  double sum_x;
  std::vector<bool> G_defined;
};

#endif  // GEODA_UNIG_H
