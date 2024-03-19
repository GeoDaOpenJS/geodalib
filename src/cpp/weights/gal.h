#ifndef GEODA_GAL_WEIGHT_H
#define GEODA_GAL_WEIGHT_H

#include <functional>
#include <map>
#include <set>
#include <vector>
#include <algorithm>

#include "weights/weights.h"


namespace geoda {

/**
 * @brief The weights structure to represent who is the neighbor of whom
 * 
 */
class GalElement {
 public:
  GalElement() {
    is_nbrAvgW_empty = true;
    idx = -1;
  }

  virtual ~GalElement() {}

  virtual size_t Size() const {
    return nbr.size();
  }

  virtual const std::vector<unsigned int>& GetNbrs() const { return nbr; }

  virtual unsigned int operator[](size_t n) const { return nbr[n]; }

  void SetSizeNbrs(size_t sz, bool is_gal = false) {
    nbr.resize(sz);
    nbrWeight.resize(sz);
    if (!is_gal) {
      for (size_t i = 0; i < sz; i++) {
        nbrWeight[i] = 1.0;
      }
    }
  }

  // (which neighbor, what ID)
  void SetNbr(size_t pos, unsigned int n) {
    if (pos < nbr.size()) {
      nbr[pos] = n;
      nbrLookup[n] = pos;
    }
    // this should be called by GAL created only
    if (pos < nbrWeight.size()) {
      nbrWeight[pos] = 1.0;
    }
  }

  // neighbor, id, weight
  void SetNbr(size_t pos, unsigned int n, double w) {
    if (pos < nbr.size()) {
      nbr[pos] = n;
      nbrLookup[n] = pos;
    } else {
      nbr.push_back(n);
      nbrLookup[n] = pos;
    }

    // this should be called by GWT-GAL
    if (pos < nbrWeight.size()) {
      nbrWeight[pos] = w;
    } else {
      nbrWeight.push_back(w);
    }
  }

  void SetNbrs(const GalElement& gal) {
    size_t sz = gal.Size();
    nbr.resize(sz);
    nbrWeight.resize(sz);

    nbr = gal.GetNbrs();
    nbrLookup = gal.nbrLookup;
    nbrWeight = gal.GetNbrWeights();
    nbrLookup = gal.nbrLookup;
    nbrAvgW = gal.nbrAvgW;
  }

  const std::vector<double>& GetNbrWeights() const { return nbrWeight; }

  void SortNbrs() { std::sort(nbr.begin(), nbr.end(), std::greater<unsigned int>()); }

  void ReverseNbrs() { std::reverse(nbr.begin(), nbr.end()); }

  // Compute spatial lag for a contiguity weights matrix.
  // Automatically performs standardization of the result
  double SpatialLag(const std::vector<double>& x) const {
    double lag = 0;
    size_t sz = Size();

    for (size_t i = 0; i < sz; ++i) {
      lag += x[nbr[i]];
    }
    if (sz > 1) {
      lag /= sz;
    }

    return lag;
  }

  double SpatialLag(const double* x) const {
    double lag = 0;
    size_t sz = Size();

    for (size_t i = 0; i < sz; ++i) {
      lag += x[nbr[i]];
    }
    if (sz > 1) {
      lag /= sz;
    }

    return lag;
  }

  double SpatialLag(const std::vector<double>& x, const int* perm) const {
    // todo: this should also handle ReadGWtAsGAL like previous 2 functions
    double lag = 0;
    size_t sz = Size();
    for (size_t i = 0; i < sz; ++i) {
      lag += x[perm[nbr[i]]];
    }
    if (sz > 1) {
      lag /= sz;
    }
    return lag;
  }

  // return row standardized weights value
  double GetRW(int idx) {
    if (is_nbrAvgW_empty) {
      size_t sz = nbr.size();
      nbrAvgW.resize(sz);
      double sumW = 0.0;

      for (size_t i = 0; i < sz; i++) {
        sumW += nbrWeight[i];
      }

      for (size_t i = 0; i < sz; i++) {
        nbrAvgW[i] = nbrWeight[i] / sumW;
      }
      is_nbrAvgW_empty = false;
    }

    if (nbrLookup.find(idx) != nbrLookup.end()) {
      return nbrAvgW[nbrLookup[idx]];
    }
    return 0.0;
  }

  bool Check(unsigned int nbrIdx) {
    if (nbrLookup.find(nbrIdx) != nbrLookup.end()) return true;
    return false;
  }

  void Update(const std::vector<bool>& undefs) {
    std::vector<int> undef_obj_positions;

    for (size_t i = 0; i < nbr.size(); i++) {
      int obj_id = nbr[i];
      if (undefs[obj_id]) {
        int pos = nbrLookup[obj_id];
        undef_obj_positions.push_back(pos);
      }
    }

    if (undef_obj_positions.empty()) return;

    // sort the positions in descending order, for removing from std::vector
    std::sort(undef_obj_positions.begin(), undef_obj_positions.end(), std::greater<int>());

    for (size_t i = 0; i < undef_obj_positions.size(); i++) {
      size_t pos = undef_obj_positions[i];
      if (pos < nbr.size()) {
        nbrLookup.erase(nbr[pos]);
        nbr.erase(nbr.begin() + pos);
      }
      if (pos < nbrWeight.size()) {
        nbrWeight.erase(nbrWeight.begin() + pos);
      }
    }
  }

  bool is_nbrAvgW_empty;
  std::vector<double> nbrAvgW;
  std::map<unsigned int, int> nbrLookup;  // nbr_id, idx_in_nbrWeight
  int idx;

  std::vector<unsigned int> nbr;
  std::vector<double> nbrWeight;
};

}  // namespace geoda

#endif  // GEODA_GAL_WEIGHT_H
