
#ifndef __GEODA_CENTER_WEIGHTS_H__
#define __GEODA_CENTER_WEIGHTS_H__

#include "lite2.h"
#include "weights/gal.h"


class Weights {
 public:
  typedef Vector<VALUE> array;
  typedef WMap map;
  typedef Vector<INDEX> set;
  typedef MAP(CNT, INDEX) keymap;
  typedef Vector<array> mat;
  typedef GWT gwt;
  typedef Vector<set> gal;

  explicit Weights(const WeightsType t = W_UNDEF, const int sz = 0) : wdim(sz), format(t), key(), mt(), gl(), gt() {
    if (sz) key.alloc(sz);
    if (format == W_GWT || format == W_GAL || format == W_MAT) {
      key.alloc(sz);
      for (int cnt = 0; cnt < sz; ++cnt) key << pairstruct<CNT, INDEX>(cnt, cnt + 1);
      if (format == W_MAT) {
        mt.alloc(sz);
        mt.reset(sz);
      } else if (format == W_GAL) {
        gl.alloc(sz);
        gl.reset(sz);
      } else if (format == W_GWT) {
        gt.alloc(sz);
        gt.reset(sz);
      }

      gt.alloc(sz);
      gt.reset(sz);
    }
  }
  Weights(const geoda::GalElement *my_gal, int num_obs);
  virtual ~Weights();
  WeightsType wtype() const { return format; }
  void Transform(const WeightsType otype);
  void MakeSymmetricStructure();
  void ComputeTranspose(GWT &transpose);

  int dim() const { return (int)wdim; }

  Iterator<array> Mit() const { return mt(); }
  Iterator<map> Git() const { return gt(); }

 protected:
  INDEX wdim;
  WeightsType format;
  keymap key;
  mat mt;
  gal gl;
  gwt gt;

 private:
  void WeightsGal(const geoda::GalElement *my_gal, int num_obs);
  // void WeightsGwt(const GwtElement * my_gwt, int num_obs);
};

#endif
