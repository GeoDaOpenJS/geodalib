// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

//
// Created by Xun Li on 2019-06-05.
//

#ifndef GEODA_BATCHLOCALMORAN_H
#define GEODA_BATCHLOCALMORAN_H

#include <vector>

#include "BatchLISA.h"

class GeoDaWeight;

class BatchLocalMoran : public BatchLISA {
  const unsigned int CLUSTER_NOT_SIG;
  const unsigned int CLUSTER_HIGHHIGH;
  const unsigned int CLUSTER_LOWLOW;
  const unsigned int CLUSTER_LOWHIGH;
  const unsigned int CLUSTER_HIGHLOW;
  const unsigned int CLUSTER_UNDEFINED;
  const unsigned int CLUSTER_NEIGHBORLESS;

 public:
  BatchLocalMoran(int num_obs, GeoDaWeight* w, const std::vector<std::vector<double> >& data,
                  const std::vector<std::vector<bool> >& undefs, double significance_cutoff, int nCPUs,
                  int permutations, uint64_t last_seed_used);

  virtual ~BatchLocalMoran();

  virtual void ComputeLoalSA();

  virtual void PermLocalSA(int cnt, int perm, const std::vector<int>& permNeighbors,
                           std::vector<std::vector<double> >& permutedSA);

  virtual std::vector<uint64_t> CountLargerSA(int cnt, const std::vector<std::vector<double> >& permutedSA);

  virtual std::vector<int> GetClusterIndicators(int idx);

 protected:
  std::vector<std::vector<double> > data;
};

#endif  // GEODA_BATCHLOCALMORAN_H
