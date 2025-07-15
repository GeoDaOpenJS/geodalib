// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

#ifndef __GEODA_CENTER_POWER_LAG_H__
#define __GEODA_CENTER_POWER_LAG_H__

#include "lite2.h"

/*
RowMultiply
product is a row-vector, that results from vector (row) and
sparse matrix (mt) multiplication.
Assumes all objects already exist.
 */
// template <class R>
inline void RowMultiply(Iterator<VALUE> row, Iterator<WMap> mt, Vector<VALUE> &product) {
  INDEX dim = mt.count();
  product.reset();
  for (INDEX cp = 0; cp < dim; ++cp) product << 0;
  for (; mt; ++mt, ++row) {
    VALUE RowValue = *row;
    if (RowValue) {
      for (WMap::input_iterator it = (*mt)(); it; ++it) {
        product[(*it).first] += (*it).second * RowValue;
      }
    }
  }
  return;
}

/*
PowerLag
 */
// template <class R>
class PowerLag {
 public:
  PowerLag(const Iterator<WMap> matrix, const INDEX vsize);
  VALUE Init();
  void AdvanceLag();

  VALUE SparseRowLag();
  VALUE SparseColumnLag();
  VALUE DenseRowLag() {
    LastWasRow = 1;
    RowMultiply(RowLag(), mt, Row);
    return Product(Row(), ColumnLag());
  };

  VALUE DenseColumnLag() {
    LastWasRow = 0;
    ColumnMultiply(ColumnLag(), mt, Column);
    AdvanceLag();
    return Product(RowLag(), ColumnLag());
  };

  VALUE ComputeLag() {
    if (NonZero.count() < LongLength)  // do sparse lag
      return LastWasRow ? SparseColumnLag() : SparseRowLag();
    if (!LongInit) {
      if (LastWasRow) return SparseColumnLag();  // last time do sparse
      for (INDEX cnt = 0; cnt < Dim; ++cnt)
        if (OrderLag[cnt] != LastOrder) RowLag[cnt] = ColumnLag[cnt] = 0;
      LongInit = 1;
    };
    return LastWasRow ? DenseColumnLag() : DenseRowLag();
  };

 private:
  WVector RowLag, Row, ColumnLag, Column;
  Vector<INDEX> OrderLag, Order, NonZero;
  bool LastWasRow, LongInit;
  INDEX LastOrder, Dim, LongLength;
  Iterator<WMap> mt;
};

#endif
