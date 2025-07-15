// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

#ifndef __GEODA_CENTER_DENSE_VECTOR_H__
#define __GEODA_CENTER_DENSE_VECTOR_H__

#include <algorithm>
#include "regression/mix.h"

class DenseVector {
 public:
  explicit DenseVector(const int sz = 0);
  DenseVector(double *p, int sz, bool rlz = false) { absorb(p, sz, rlz); }
  ~DenseVector();

  void alloc(const int sz);
  void absorb(double *p, int sz, bool rlz = false) {
    size = sz;
    val = p;
    rlse = rlz;
  }

  int getNzEntries() const { return size; }
  int getSize() const { return size; }
  double *getThis() const { return val; }

  bool isNonZero(const int ix) const { return true; }

  int getIx(const int elt) const { return elt; }

  double getValue(const int ix) const { return val[ix]; }

  void setAt(const int ix, const double &v) { val[ix] = v; }

  void plusAt(const int ix, const double &v) { val[ix] += v; }

  void addTimes(const DenseVector &v, const double &w);

  void reset() {
    for (int cnt = 0; cnt < size; ++cnt) val[cnt] = 0;
  }

  void makeDenseReady();

  void minus(const DenseVector &a, const DenseVector &b);

  double norm() const;
  double normW(const double *w) const { return ::normW(val, w, size); }

  double product(const DenseVector &a) const;
  void timesMatrix(DenseVector &v, const DenseVector *w) const;
  void timesSquareMatrix(DenseVector &v, double **mx) const;
  void squareTimesColumn(DenseVector &v, double **cov) const;
  void copy(const DenseVector &a);

  void timesPlus(const DenseVector &a, const double &s);

  void times(const double v) {
    for (int cnt = 0; cnt < size; ++cnt) val[cnt] *= v;
  }

  void minusTimes(const DenseVector &v, const DenseVector &vl, const double rho) {
    for (int cnt = 0; cnt < size; ++cnt) this->setAt(cnt, v.getValue(cnt) - rho * vl.getValue(cnt));
  }

  void dropZeros() const {}

  double sum() const;

 private:
  int size;     // vector size (== allocation of the arrays)
  bool rlse;    // release memory on destruction
  double *val;  // values of all elements
};

#endif
