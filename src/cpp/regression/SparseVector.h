#ifndef __GEODA_CENTER_SPARSE_VECTOR_H__
#define __GEODA_CENTER_SPARSE_VECTOR_H__

#include <algorithm>

/*  ---  SparseVector  ---  */
class SparseVector {
 public:
  explicit SparseVector(const int sz);
  virtual ~SparseVector();
  int getNzEntries() const { return nzEntries; }
  bool isNonZero(const int ix) const { return isNz[ix]; }
  int getIx(const int elt) const { return nz[elt]; }
  double getValue(const int ix) const { return val[ix]; }
  void setAt(const int ix, const double &v) {
    checkin(ix);
    val[ix] = v;
  }
  void plusAt(const int ix, const double &v) {
    checkin(ix);
    val[ix] += v;
  }
  void addTimes(const SparseVector &v, const double &w);
  void reset() { checkout(); }
  void makeDenseReady();
  void minus(const SparseVector &a, const SparseVector &b);
  double norm() const;

  double product(const SparseVector &a) const;
  void copy(const SparseVector &a);
  void timesPlus(const SparseVector &a, const double &s);
  void dropZeros();

 private:
  int size;       // vector size (== allocation of the arrays)
  int nzEntries;  // number of non-zero entries;
  bool denseReady;
  double *val;  // values of all elements
  int *nz;      // list of indices of non-zero elements;
  bool *isNz;   // indicator of non-zero values
  void checkin(const int ix) {
    if (!isNz[ix]) {
      isNz[ix] = true;
      nz[nzEntries++] = ix;
    }
  }
  void checkout();
};
#endif
