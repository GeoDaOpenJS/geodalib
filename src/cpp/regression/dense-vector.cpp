#include "regression/dense-vector.h"
#include "regression/mix.h"

DenseVector::DenseVector(const int sz) : size(0), val(NULL) {
  if (sz < 0) error("  size of vector must be positive");
  if (sz > 0) alloc(sz);
}

void DenseVector::alloc(const int sz) {
  if (size > 0 && size != sz) release(&val);
  size = sz;
  val = new double[sz];
  if (!val) {
    error("Error: fail to allocate memory");
  }
  rlse = false;

  reset();
}

DenseVector::~DenseVector() {
  if (rlse) release(&val);
  //    rlse = true;
  size = 0;
}

void DenseVector::addTimes(const DenseVector &v, const double &w) {
  for (int cnt = 0; cnt < size; ++cnt) val[cnt] += v.val[cnt] * w;
}

void DenseVector::minus(const DenseVector &a, const DenseVector &b) {
  if (a.size != this->size || b.size != this->size) {
    error("  vector size don't match");
  };
  for (int cnt = 0; cnt < size; ++cnt) val[cnt] = a.val[cnt] - b.val[cnt];
}

double DenseVector::norm() const { return ::norm(val, size); }

double DenseVector::product(const DenseVector &a) const {
  double s = ::product(this->val, a.val, size);
  return s;
}

void DenseVector::timesMatrix(DenseVector &v, const DenseVector *w) const {
  const int dim = w[0].getSize();
  v.alloc(dim);
  for (int cnt = 0; cnt < dim; ++cnt) {
    double s = 0;
    for (int cp = 0; cp < this->getSize(); ++cp) s += this->getValue(cp) * w[cp].getValue(cnt);
    v.setAt(cnt, s);
  }
}

void DenseVector::timesSquareMatrix(DenseVector &v, double **cov) const {
  v.alloc(this->getSize());
  for (int cnt = 0; cnt < getSize(); ++cnt) {
    double s = 0;
    for (int cp = 0; cp < getSize(); ++cp) s += getValue(cp) * cov[cp][cnt];
    v.setAt(cnt, s);
  }
}

void DenseVector::squareTimesColumn(DenseVector &v, double **cov) const {
  v.alloc(this->getSize());
  for (int cnt = 0; cnt < getSize(); ++cnt) {
    double s = 0;
    for (int cp = 0; cp < getSize(); ++cp) s += getValue(cp) * cov[cnt][cp];
    v.setAt(cnt, s);
  }
}

void DenseVector::copy(const DenseVector &a) {
  for (int cnt = 0; cnt < size; ++cnt) val[cnt] = a.val[cnt];
}

void DenseVector::timesPlus(const DenseVector &a, const double &s) {
  for (int cnt = 0; cnt < size; ++cnt) val[cnt] = val[cnt] * s + a.val[cnt];
}

double DenseVector::sum() const {
  double sum = 0;

  for (int cnt = 0; cnt < size; ++cnt) sum += val[cnt];

  return sum;
}
