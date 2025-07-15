// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

#ifndef __GEODA_CENTER_SPARSE_MATRIX_H__
#define __GEODA_CENTER_SPARSE_MATRIX_H__

#include <list>
#include <set>
#include <utility>
#include <vector>

#include "regression/SparseRow.h"
#include "regression/SparseVector.h"
#include "regression/dense-vector.h"
#include "weights/gal.h"


/*  ---  SparseMatrix  ---  */
class SparseMatrix {
 public:
  SparseMatrix(const int sz) { init(sz); }
  SparseMatrix(const geoda::GalElement *my_gal, int obs);
  virtual ~SparseMatrix();

  int dim() const { return size; }

  void rowMatrix(SparseVector &row1, const SparseVector &row2) const;
  void matrixColumn(DenseVector &c1, const DenseVector &c2) const;

  void rowStandardize();

  void alloc(const int ns) {
    if (ns != size) {
      release(&row);
      release(&scale);
    }
    init(ns);
  }

  void setRow(const int loc, SparseRow &r) { row[loc] = r; }
  SparseRow &getRow(const int r) const { return row[r]; }

  double *getScale() const { return scale; }

  void makeStdSymmetric();
  void makeRowStd();

  void rowIminusRhoThis(const double rho, SparseVector &row1, const SparseVector &row2) const;
  void IminusRhoThis(const double rho, const DenseVector &column, DenseVector &result) const;

  void WtTimesColumn(DenseVector &wtx, DenseVector const &x);

  void scaleUp(DenseVector &v, const DenseVector &src) const {
    for (int cnt = 0; cnt < size; ++cnt) v.setAt(cnt, src.getValue(cnt) * scale[cnt]);
  }

  void scaleDown(DenseVector &v) const {
    for (int cnt = 0; cnt < size; ++cnt) v.setAt(cnt, v.getValue(cnt) / scale[cnt]);
  }

 private:
  int size;  // dimension of the square matrix
  SparseRow *row;
  DenseVector *col;
  double *scale;

  void init(const int sz);
  void createGAL(const geoda::GalElement *my_gal, int obs);
  void MakeTranspose();
  std::vector<std::list<std::pair<int, double> > > transpose;
};
#endif
