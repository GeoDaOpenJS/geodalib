// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

#include <vector>
#include <string>

#include "weights/gal.h"
#include "weights/geoda-weight.h"

class VectorWeight : public GeoDaWeight {
 public:
  geoda::GalElement* gal;

  VectorWeight() : gal(0) { weight_type = gal_type; }

  explicit VectorWeight(const std::vector<std::vector<unsigned int>>& neighbors);

  VectorWeight(const VectorWeight& gw);

  virtual ~VectorWeight() {
    if (gal) delete[] gal;
    gal = 0;
  }

  virtual VectorWeight& operator=(const VectorWeight& gw);

  virtual bool HasIsolates();

  virtual void Update(const std::vector<bool>& undefs);

  virtual bool CheckNeighbor(int obs_idx, int nbr_idx);

  virtual const std::vector<unsigned int> GetNeighbors(int obs_idx);

  virtual const std::vector<double> GetNeighborWeights(int obs_idx);

  virtual void GetNbrStats();

  virtual int GetNbrSize(int obs_idx);

  virtual double SpatialLag(int obs_idx, const std::vector<double>& data);

  virtual bool Save(const char* ofname, const char* layer_name, const char* id_var_name,
                    const std::vector<int>& id_vec);

  virtual bool Save(const char* ofname, const char* layer_name, const char* id_var_name,
                    const std::vector<std::string>& id_vec);

  virtual void SetNeighbors(int id, const std::vector<int>& nbr_ids);

  virtual void SetNeighborsAndWeights(int id, const std::vector<int>& nbr_ids, const std::vector<double>& w);
};
