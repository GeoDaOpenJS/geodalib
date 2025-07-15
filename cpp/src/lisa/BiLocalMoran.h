// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

//
// Created by Xun Li on 2021-09-05.
//

#ifndef GEODA_BILOCALMORAN_H
#define GEODA_BILOCALMORAN_H

#include <vector>
#include <string>

#include "LISA.h"

class GeoDaWeight;

class BiLocalMoran : public LISA {
  const unsigned int CLUSTER_NOT_SIG;
  const unsigned int CLUSTER_HIGHHIGH;
  const unsigned int CLUSTER_LOWLOW;
  const unsigned int CLUSTER_LOWHIGH;
  const unsigned int CLUSTER_HIGHLOW;
  const unsigned int CLUSTER_UNDEFINED;
  const unsigned int CLUSTER_NEIGHBORLESS;

 public:
  BiLocalMoran(int num_obs, GeoDaWeight* w, const std::vector<double>& data1, const std::vector<double>& data2,
               const std::vector<bool>& undefs, double significance_cutoff, int nCPUs, int permutations,
               const std::string& _permutation_method, uint64_t last_seed_used);

  virtual ~BiLocalMoran();

  virtual void ComputeLoalSA();

  virtual void PermLocalSA(int cnt, int perm, const std::vector<int>& permNeighbors, std::vector<double>& permutedSA);

  virtual void PermLocalSA(int cnt, int perm, int numNeighbors, const int* permNeighbors,
                           std::vector<double>& permutedSA);

  virtual uint64_t CountLargerSA(int cnt, const std::vector<double>& permutedSA);

  virtual std::vector<int> GetClusterIndicators();

 protected:
  std::vector<double> data1;
  std::vector<double> data2;
};

#endif  // GEODA_BiLocalMoran_H
