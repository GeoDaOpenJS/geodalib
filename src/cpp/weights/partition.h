#ifndef GEODA_GAL_PARTITION_H
#define GEODA_GAL_PARTITION_H

#include <algorithm>
#include <functional>
#include <map>
#include <set>
#include <vector>

#include "geometry/geometry.h"
#include "weights/weights.h"

#define CMP_DBL_EPSILON sqrt(DBL_EPSILON)

namespace geoda {

static const int EMPTY_COUNT = -1;

class BasePartition {
 protected:
  int elements, cells;
  int* cell;
  int* next;
  double step;

 public:
  explicit BasePartition(const int els = 0, const int cls = 0, const double range = 0)
      : elements(els), cells(cls), cell(0), next(0) {
    if (elements > 0) {
      alloc(els, cls, range);
    }
  }
  virtual ~BasePartition() {
    if (cell) delete[] cell;
    cell = 0;
    if (next) delete[] next;
    next = 0;
    elements = 0;
    cells = 0;
  }

  void virtual alloc(const int els, const int cls, const double range) {
    elements = els;
    cells = cls;
    step = range / cls;
    cell = new int[cells];
    next = new int[elements];
    if (cell && next) {
      for (int cnt = 0; cnt < cells; ++cnt) {
        cell[cnt] = EMPTY_COUNT;
      }
    } else {
      elements = cells = 0;
    }
  }

  int Cells() const { return cells; }
  double Step() const { return step; }

  virtual void include(const int incl, const double range) {
    int where = static_cast<int>(floor(range / step));
    // if (where < -1 || where > cells || incl < 0 || incl >= elements)
    //     cout << " BasePartition: incl= " << incl << " location= "
    //          << where << " els= " << elements << " cells= "
    //          << cells << endl;
    if (where < 0)
      where = 0;
    else if (where >= cells)
      where = cells - 1;
    next[incl] = cell[where];
    cell[where] = incl;
    return;
  }

  int first(const int cl) const { return cell[cl]; }
  int tail(const int elt) const { return next[elt]; }
};

class PartitionP : public BasePartition {
 private:
  int* cellIndex;
  int* previous;

 public:
  explicit PartitionP(const int els = 0, const int cls = 0, const double range = 0)
      : BasePartition(els, cls), cellIndex(NULL), previous(NULL) {
    if (elements > 0) {
      alloc(els, cls, range);
    }
  }
  virtual ~PartitionP() {
    if (cellIndex) delete[] cellIndex;
    if (previous) delete[] previous;
    cellIndex = NULL;
    previous = NULL;
  }
  void alloc(const int els, const int cls, const double range) {
    BasePartition::alloc(els, cls, range);
    cellIndex = new int[elements];
    previous = new int[elements];
    if (!cellIndex || !previous) {
      elements = 0;
      cells = 0;
    }
  }

  using BasePartition::include;  // tell the compiler we want both the include from Base and ours

  virtual void include(const int incl) {
    int where = cellIndex[incl];
    //        if (where < 0 || where >= cells || incl < 0 || incl >= elements)
    //          cout << "including " << incl << " at " << where << endl;
    int old = cell[where];
    cell[where] = incl;
    if (old != EMPTY_COUNT) previous[old] = incl;
    next[incl] = old;              // OLD becomes the 2nd element in the list
    previous[incl] = EMPTY_COUNT;  // there are no elements prior to incl
  }

  void initIx(const int incl, const double range) {
    int cl = static_cast<int>(floor(range / step));
    // if (cl < -1 || cl > cells || incl < 0 || incl >= elements)
    //     cout << "PartitionP: incl= " << incl << " at " << cl << endl;
    if (cl < 0)
      cl = 0;
    else if (cl >= cells)
      cl = cells - 1;
    cellIndex[incl] = cl;
    return;
  }

  int inTheRange(const double range) const {
    if (range < 0 || range / step > cells + CMP_DBL_EPSILON) {
      return -1;
    }
    int where = static_cast<int>(floor(range / step));
    if (where < 0) {
      where = 0;
    } else if (where >= cells) {
      --where;
    }
    return where;
  }

  void remove(const int del) {
    int thePrevious = previous[del], theNext = next[del];
    if (thePrevious == EMPTY_COUNT) {
      // this is the 1st element in the list
      cell[cellIndex[del]] = theNext;
    } else {
      next[thePrevious] = theNext;
    }
    if (theNext != EMPTY_COUNT) {
      // this is not the last element in thelist
      previous[theNext] = thePrevious;
    }
    // probably this is not necessary
    previous[del] = next[del] = EMPTY_COUNT;
  }

  void cleanup(const BasePartition& p, const int cl) {
    for (int cnt = p.first(cl); cnt != EMPTY_COUNT; cnt = p.tail(cnt)) {
      remove(cnt);
    }
  }
};

class PolygonPartition {
 protected:
  const GeometryCollection& geoms;
  size_t polygon_index;
  box_type bbox;

  BasePartition pX;
  PartitionP pY;
  int* nbrPoints;

  int prev(const int pt) const {
    int ix = nbrPoints[pt];
    return (ix >= 0) ? pt - 1 : -ix;
  }
  int succ(const int pt) const {
    int ix = nbrPoints[pt];
    return (ix >= 0) ? ix : pt + 1;
  }

 public:
  int NumPoints;
  int NumParts;

  // constructor
  explicit PolygonPartition(const GeometryCollection& _geoms, size_t _polygon_index)
      : geoms(_geoms), pX(), pY(), nbrPoints(NULL) {
    polygon_index = _polygon_index;

    // get number of points from boost::geometry::polygon
    this->NumPoints = geoms.get_num_points(polygon_index);
    // get number of parts from boost::geometry::polygon
    this->NumParts = geoms.get_num_parts(polygon_index);

    // get bbox
    geoms.get_bbox(polygon_index, this->bbox);
  }

  // destructor
  ~PolygonPartition() {
    if (nbrPoints) {
      delete[] nbrPoints;
      nbrPoints = NULL;
    }
  }

  point_type GetPoint(const int i) { return geoms.get_point(polygon_index, i); }

  int GetPart(int i) { return geoms.get_part(polygon_index, i); }

  double GetMinX() { return bbox.min_corner().get<0>(); }
  double GetMinY() { return bbox.min_corner().get<1>(); }
  double GetMaxX() { return bbox.max_corner().get<0>(); }
  double GetMaxY() { return bbox.max_corner().get<1>(); }

  int MakePartition(int mX = 0, int mY = 0) {
    if (mX == 0) {
      mX = NumPoints / 4 + 2;
    }
    if (mY == 0) {
      mY = static_cast<int>(sqrt((long double)NumPoints) + 2);
    }
    pX.alloc(NumPoints, mX, GetMaxX() - GetMinX());
    pY.alloc(NumPoints, mY, GetMaxY() - GetMinY());
    double xStart = GetMinX(), yStart = GetMinY();
    for (int cnt = 0; cnt < NumPoints; ++cnt) {
      point_type pt = GetPoint(cnt);
      // get x from boost::geometry::point
      pX.include(cnt, pt.get<0>() - xStart);
      // get y from boost::geometry::point
      pY.initIx(cnt, pt.get<1>() - yStart);
    }
    MakeNeighbors();
    return 0;
  }

  void MakeSmallPartition(const int mX, const double Start, const double Stop) {
    pX.alloc(NumPoints, mX, Stop - Start);
    for (int cnt = 0; cnt < NumPoints; ++cnt) {
      point_type pt = GetPoint(cnt);
      double x = pt.get<0>();
      if (x >= Start && x <= Stop) {
        pX.include(cnt, x - Start);
      }
    }
    MakeNeighbors();
  }

  void MakeNeighbors() {
    nbrPoints = new int[NumPoints];
    if (nbrPoints == NULL) return;

    for (int cnt = 0; cnt < NumPoints; ++cnt) {
      nbrPoints[cnt] = cnt + 1;
    }

    int first = 0, last;
    for (int part = 1; part <= NumParts; ++part) {
      last = (part == NumParts) ? NumPoints : GetPart(part);
      nbrPoints[first] = -(last - 2);
      nbrPoints[last - 1] = first + 1;
      first = last;
    }
  }

  // Method for detecting if an edge is shared between a host and guest polygon.
  bool edge(PolygonPartition& p, const int host, const int guest, double precision_threshold) {
    point_type guestPrev = p.GetPoint(p.prev(guest));
    point_type hostPoint = GetPoint(succ(host));

    if (points_equals(hostPoint, guestPrev, precision_threshold)) {
      return true;
    }

    point_type guestSucc = p.GetPoint(p.succ(guest));
    if (points_equals(hostPoint, guestSucc, precision_threshold)) {
      return true;
    }

    hostPoint = this->GetPoint(prev(host));

    if (points_equals(hostPoint, guestSucc, precision_threshold)) {
      return true;
    }

    if (points_equals(hostPoint, guestPrev, precision_threshold)) {
      return true;
    }

    return false;
  }

  // Determines if two polygons are neighbors. The host is assumed to be partitioned.
  // Uses two criteria to establish neighborhood: is_queen == true then: common point, else: common boundary
  int sweep(PolygonPartition& guest, bool is_queen, double precision_threshold = 0.0) {
    int host, dot, cly, cell;
    double yStart = GetMinY();
    // double  yStop= GetMaxY();
    point_type pt;
    guest.MakeSmallPartition(pX.Cells(), GetMinX(), GetMaxX());
    for (cell = 0; cell < pX.Cells(); ++cell) {
      for (host = pX.first(cell); host != EMPTY_COUNT; host = pX.tail(host)) {
        pY.include(host);
      }
      for (dot = guest.pX.first(cell); dot != EMPTY_COUNT; dot = guest.pX.tail(dot)) {
        pt = guest.GetPoint(dot);
        double x = pt.get<0>();
        double y = pt.get<1>();
        cly = pY.inTheRange(y - yStart);
        if (cly != -1) {
          for (host = pY.first(cly); host != EMPTY_COUNT; host = pY.tail(host)) {
            point_type hostPt = GetPoint(host);
            double xHost = hostPt.get<0>();
            double yHost = hostPt.get<1>();
            // check if abs(x - xHost) <= precision_threshold and abs(y - yHost) <= precision_threshold
            if (std::abs(x - xHost) <= precision_threshold && std::abs(y - yHost) <= precision_threshold) {
              if (is_queen || edge(guest, host, dot, precision_threshold)) {
                pY.cleanup(pX, cell);
                return 1;
              }
            }
          }
        }
      }
      pY.cleanup(pX, cell);
    }
    return 0;
  }
};

typedef struct Ref {
  int next, prev;
  Ref(const int nxt = -1, const int prv = -1) : next(nxt), prev(prv) {}
} RefStruct;

typedef RefStruct* RefPtr;

class PartitionM {
 private:
  double step;
  int elements, cells;
  int* cell;
  int* cellIndex;
  int* lastIndex;
  RefPtr* Refs;

 public:
  PartitionM(const int els, const int cls, const double range) : elements(els), cells(cls) {
    cell = new int[cells];
    cellIndex = new int[elements];
    lastIndex = new int[elements];
    int cnt;
    for (cnt = 0; cnt < cells; ++cnt) cell[cnt] = EMPTY_COUNT;
    Refs = new RefPtr[elements];
    for (cnt = 0; cnt < elements; ++cnt) Refs[cnt] = NULL;
    step = range / cells;
  }

  virtual ~PartitionM() {
    if (cell) {
      delete[] cell;
      cell = NULL;
    }
    if (cellIndex) {
      delete[] cellIndex;
      cellIndex = NULL;
    }
    if (lastIndex) {
      delete[] lastIndex;
      lastIndex = NULL;
    }
    if (Refs) {
      for (int ref = 0; ref < elements; ++ref)
        if (Refs[ref]) delete[] Refs[ref];
      delete[] Refs;
      Refs = NULL;
    }
    cells = 0;
    elements = 0;
  }

  // Include element incl with duration [lower, upper] into the partition.
  void include(const int incl) {
    int cnt, lower = cellIndex[incl], upper = lastIndex[incl];
    RefPtr rptr = new RefStruct[upper - lower + 1];
    Refs[incl] = rptr;
    for (cnt = upper - lower; cnt >= 0; --cnt) rptr[cnt] = Ref();
    for (cnt = lower; cnt <= upper; ++cnt) {
      int old = cell[cnt];                            // first element in the cell
      cell[cnt] = incl;                               // new first element in the cell
      if (old != EMPTY_COUNT) {                       // the cell was not empty
        rptr[cnt - lower].next = old;                 // OLD is the next element after incl in the list
        Refs[old][cnt - cellIndex[old]].prev = incl;  // incl is preceeding OLD in the list
      }
    }
  }

  // Remove an element del from the partition.
  void remove(const int del) {
    int lower = cellIndex[del], upper = lastIndex[del], cnt;
    for (cnt = lower; cnt <= upper; ++cnt) {
      RefStruct cRef = Refs[del][cnt - lower];
      if (cRef.prev < 0)  // this is the first element in the list
        cell[cnt] = cRef.next;
      else
        Refs[cRef.prev][cnt - cellIndex[cRef.prev]].next = cRef.next;
      if (cRef.next != EMPTY_COUNT)  // this is not the last element in the list
        Refs[cRef.next][cnt - cellIndex[cRef.next]].prev = cRef.prev;
    }
    delete[] Refs[del];
    Refs[del] = NULL;
  }

  void initIx(const int incl, const double lwr, const double upr) {
    int lower = static_cast<int>(floor(lwr / step));
    int upper = static_cast<int>(floor(upr / step));

    if (lower < 0) {
      lower = 0;
    } else if (lower >= cells) {
      lower = cells - 1;
    }

    if (upper >= cells) {
      upper = cells - 1;
    } else if (upper < 0) {
      upper = 0;
    }

    if (lower < 0 || upper > cells || incl < 0 || incl >= elements) {
      // should never be here
    }

    cellIndex[incl] = lower;
    lastIndex[incl] = upper;
    return;
  }
  int lowest(const int el) const { return cellIndex[el]; }
  int upmost(const int el) const { return lastIndex[el]; }
  int first(const int cl) const { return cell[cl]; }
  int tail(const int elt, const int cl) const { return Refs[elt][cl - cellIndex[elt]].next; }
  int Sum() const {
    int sum = 0;
    for (int cnt = 0; cnt < elements; ++cnt) {
      sum += (lastIndex[cnt] - cellIndex[cnt] + 1);
    }
    return sum;
  }
};

}  // namespace geoda

#endif  // GEODA_GAL_PARTITION_H
