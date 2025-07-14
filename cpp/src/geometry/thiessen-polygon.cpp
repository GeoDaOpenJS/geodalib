// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

#include "geometry/thiessen-polygon.h"

#include <algorithm>
#include <cmath>
#include <iostream>
#include <list>
#include <map>
#include <utility>
#include <vector>

using namespace geoda;

ThiessenPolygon::ThiessenPolygon(const std::vector<double>& x, const std::vector<double>& y) {
  int num_obs = x.size();

  polys.clear();
  polys.resize(num_obs);

  double x_orig_min = 0, x_orig_max = 0;
  double y_orig_min = 0, y_orig_max = 0;

  // get min and max of x and y
  for (int i = 0; i < num_obs; i++) {
    if (i == 0) {
      x_orig_min = x[i];
      x_orig_max = x[i];
      y_orig_min = y[i];
      y_orig_max = y[i];
    } else {
      x_orig_min = std::min(x_orig_min, x[i]);
      x_orig_max = std::max(x_orig_max, x[i]);
      y_orig_min = std::min(y_orig_min, y[i]);
      y_orig_max = std::max(y_orig_max, y[i]);
    }
  }

  double orig_scale = std::max(x_orig_max - x_orig_min, y_orig_max - y_orig_min);
  if (orig_scale == 0) orig_scale = 1;

  double big_dbl = 1073741824;  // 2^30 should be replaced with DBL_MAX
  double p = big_dbl / orig_scale;

  // Add 2% offset to the bounding rectangle
  const double bb_pad = 0.02;
  // note data has been translated to origin and scaled
  double bbox_xmin = -bb_pad * big_dbl;
  double bbox_xmax = (x_orig_max - x_orig_min) * p + bb_pad * big_dbl;
  double bbox_ymin = -bb_pad * big_dbl;
  double bbox_ymax = (y_orig_max - y_orig_min) * p + bb_pad * big_dbl;

  double voronoi_bb_xmin = (bbox_xmin / p) + x_orig_min;
  double voronoi_bb_xmax = (bbox_xmax / p) + x_orig_min;
  double voronoi_bb_ymin = (bbox_ymin / p) + y_orig_min;
  double voronoi_bb_ymax = (bbox_ymax / p) + y_orig_min;

  if (num_obs == 1) {
    // single point should return the boundary
    std::vector<double> boundary_x;
    std::vector<double> boundary_y;
    boundary_x.push_back(voronoi_bb_xmin);
    boundary_y.push_back(voronoi_bb_ymin);
    boundary_x.push_back(voronoi_bb_xmax);
    boundary_y.push_back(voronoi_bb_ymin);
    boundary_x.push_back(voronoi_bb_xmax);
    boundary_y.push_back(voronoi_bb_ymax);
    boundary_x.push_back(voronoi_bb_xmin);
    boundary_y.push_back(voronoi_bb_ymax);
    this->polys[0].add(boundary_x, boundary_y, false);
    return;
  }

  std::map<int, std::list<int> > dups;
  std::map<int, std::list<int> >::iterator dups_iter;
  std::map<int_pair, int> pt_map;
  std::map<int_pair, int>::iterator map_iter;
  std::vector<int> x_int(num_obs);
  std::vector<int> y_int(num_obs);

  bool duplicates_exist = false;
  std::list<std::list<int> > duplicates;
  for (int i = 0; i < num_obs; i++) {
    x_int[i] = static_cast<int>((x[i] - x_orig_min) * p);
    y_int[i] = static_cast<int>((y[i] - y_orig_min) * p);
    int_pair key(std::make_pair(x_int[i], y_int[i]));
    map_iter = pt_map.find(key);
    if (map_iter == pt_map.end()) {
      pt_map[key] = i;
    } else {
      duplicates_exist = true;
      int ind1 = map_iter->second;
      int ind2 = i;
      dups_iter = dups.find(ind1);
      if (dups_iter == dups.end()) {
        std::list<int> l;
        l.push_back(ind1);
        l.push_back(ind2);
        dups[ind1] = l;
      } else {
        dups_iter->second.push_back(ind2);
      }
    }
  }
  if (duplicates_exist) {
    for (dups_iter = dups.begin(); dups_iter != dups.end(); dups_iter++) {
      duplicates.push_back(dups_iter->second);
    }
  }

  VD vd;
  VB vb;

  std::vector<int_pair> int_pts(num_obs);
  for (int i = 0; i < num_obs; i++) {
    int_pts[i].first = x_int[i];
    int_pts[i].second = y_int[i];
  }
  for (int i = 0; i < num_obs; i++) {
    vb.insert_point(x_int[i], y_int[i]);
  }
  // Voronoi diagram construction on %d points
  vb.construct(&vd);

  int cell_cnt = 0;
  int max_pts = 1000;
  ThiessenPoint* pts = new ThiessenPoint[max_pts];

  for (VD::const_cell_iterator it = vd.cells().begin(); it != vd.cells().end(); ++it) {
    bool boundary_cell = false;
    int edge_cnt = 0;
    const VD::cell_type& cell = *it;

    int_pair key = std::make_pair(x_int[cell.source_index()], y_int[cell.source_index()]);
    int ind = pt_map.find(key)->second;

    const VD::edge_type* edge = cell.incident_edge();
    double x_init = 0;
    double y_init = 0;
    do {
      if (!edge->is_finite() || !edge->is_primary()) {
        boundary_cell = true;
        break;
      }
      // The following ensures that the same edge is always clipped.
      // This ensurues that adjacent polygons have the exact same
      // shared-edge descriptions.
      double edge_x0, edge_y0, edge_x1, edge_y1;
      bool intersects_e = false;
      if (edge < edge->twin()) {
        intersects_e = this->clipEdge(*edge, int_pts, bbox_xmin, bbox_ymin, bbox_xmax, bbox_ymax, edge_x0, edge_y0,
                                      edge_x1, edge_y1);
      } else {
        intersects_e = this->clipEdge(*edge->twin(), int_pts, bbox_xmin, bbox_ymin, bbox_xmax, bbox_ymax, edge_x0,
                                      edge_y0, edge_x1, edge_y1);
      }
      if (!intersects_e) {
        boundary_cell = true;
        break;
      }
      if (edge_cnt - 1 > max_pts) {
        delete[] pts;
        max_pts = 2 * edge_cnt;
        pts = new ThiessenPoint[max_pts];
      }
      double x0 = (edge_x0 / p) + x_orig_min;
      double y0 = (edge_y0 / p) + y_orig_min;
      double x1 = (edge_x1 / p) + x_orig_min;
      double y1 = (edge_y1 / p) + y_orig_min;
      // The following code is commented out because it will generate a triangle instead of a polygon
      // if (edge_cnt == 0) {
      //   x_init = x0;
      //   y_init = y0;
      // }
      pts[edge_cnt].x = x0;
      pts[edge_cnt].y = y0;

      edge_cnt++;
      edge = edge->next();

      if (edge == cell.incident_edge()) {
        if (x1 == x_init && y1 == y_init) {
          // Check if we need to close the polygon
          pts[edge_cnt].x = x1;
          pts[edge_cnt].y = y1;
          edge_cnt++;
        } else {
          boundary_cell = true;
          break;
        }
      }
    } while (edge != cell.incident_edge());

    if (!boundary_cell) {
      this->createPolygonFromPoints(edge_cnt, pts, polys[ind]);
    } else {
      // boundary cell, need to determine clipped polygon
      edge = cell.incident_edge();
      edge_cnt = 0;

      mpoint_type h_pts;
      my_polygon hull;

      do {
        // The following ensures that the same edge is always clipped.
        // This ensurues that adjacent polygons have the exact same
        // shared-edge descriptions.
        double edge_x0, edge_y0, edge_x1, edge_y1;
        bool intersects_e = false;
        if (edge < edge->twin()) {
          intersects_e = this->clipEdge(*edge, int_pts, bbox_xmin, bbox_ymin, bbox_xmax, bbox_ymax, edge_x0, edge_y0,
                                        edge_x1, edge_y1);
        } else {
          intersects_e = this->clipEdge(*edge->twin(), int_pts, bbox_xmin, bbox_ymin, bbox_xmax, bbox_ymax, edge_x0,
                                        edge_y0, edge_x1, edge_y1);
        }
        if (intersects_e) {
          double x0 = (edge_x0 / p) + x_orig_min;
          double y0 = (edge_y0 / p) + y_orig_min;
          boost::geometry::append(h_pts, boost::geometry::make<point_xy>(x0, y0));
          double x1 = (edge_x1 / p) + x_orig_min;
          double y1 = (edge_y1 / p) + y_orig_min;
          boost::geometry::append(h_pts, boost::geometry::make<point_xy>(x1, y1));
        }
        edge_cnt++;
        edge = edge->next();
      } while (edge != cell.incident_edge());

      // make sure that the cell's internal point is also within the
      // convex hull.
      double x0 = (static_cast<double>(x_int[cell.source_index()]) / p) + x_orig_min;
      double y0 = (static_cast<double>(y_int[cell.source_index()]) / p) + y_orig_min;
      boost::geometry::append(h_pts, boost::geometry::make<point_xy>(x0, y0));

      boost::geometry::convex_hull(h_pts, hull);

      ring_type outer_ring = hull.outer();
      int pts_cnt = 0;
      for (ring_type::iterator it = outer_ring.begin(); it != outer_ring.end(); it++) {
        double x = boost::geometry::get<0>(*it);
        double y = boost::geometry::get<1>(*it);
        pts[pts_cnt].x = x;
        pts[pts_cnt].y = y;
        pts_cnt++;
      }
      this->createPolygonFromPoints(pts_cnt, pts, polys[ind]);
    }
  }

  if (duplicates_exist) {
    // Must fill in missing entries in poly vector with copies
    // of duplicate shapes.
    for (dups_iter = dups.begin(); dups_iter != dups.end(); dups_iter++) {
      int head_id = dups_iter->first;
      for (std::list<int>::iterator iter = dups_iter->second.begin(); iter != dups_iter->second.end(); iter++) {
        if (*iter == head_id) continue;
        polys[*iter].copy(polys[head_id]);
      }
    }
  }

  if (pts) delete[] pts;
}

std::vector<Polygon> ThiessenPolygon::get_polygons() const { return polys; }

std::list<int>* ThiessenPolygon::getCellList(const VD::cell_type& cell,
                                             std::map<std::pair<int, int>, std::list<int>*>& pt_to_id_list,
                                             std::vector<std::pair<int, int> >& int_pts) {
  std::map<std::pair<int, int>, std::list<int>*>::iterator iter;
  iter = pt_to_id_list.find(int_pts[cell.source_index()]);
  if (iter == pt_to_id_list.end()) {
    return 0;
  }
  return iter->second;
}

bool ThiessenPolygon::isVertexOutsideBB(const VD::vertex_type& vertex, const double& xmin, const double& ymin,
                                        const double& xmax, const double& ymax) {
  double x = vertex.x();
  double y = vertex.y();
  return (x < xmin || x > xmax || y < ymin || y > ymax);
}

bool ThiessenPolygon::clipEdge(const VD::edge_type& edge, std::vector<std::pair<int, int> >& int_pts,
                               const double& xmin, const double& ymin, const double& xmax, const double& ymax,
                               double& x0, double& y0, double& x1, double& y1) {
  if (edge.is_finite()) {
    return this->clipFiniteEdge(edge, int_pts, xmin, ymin, xmax, ymax, x0, y0, x1, y1);
  } else {
    return this->clipInfiniteEdge(edge, int_pts, xmin, ymin, xmax, ymax, x0, y0, x1, y1);
  }
}

bool ThiessenPolygon::clipInfiniteEdge(const VD::edge_type& edge, std::vector<std::pair<int, int> >& int_pts,
                                       const double& xmin, const double& ymin, const double& xmax, const double& ymax,
                                       double& x0, double& y0, double& x1, double& y1) {
  const VD::cell_type& cell1 = *edge.cell();
  const VD::cell_type& cell2 = *edge.twin()->cell();
  double origin_x, origin_y, direction_x, direction_y;
  // Infinite edges could not be created by two segment sites.
  if (cell1.contains_point() && cell2.contains_point()) {
    double p1_x = static_cast<double>(int_pts[cell1.source_index()].first);
    double p1_y = static_cast<double>(int_pts[cell1.source_index()].second);
    double p2_x = static_cast<double>(int_pts[cell2.source_index()].first);
    double p2_y = static_cast<double>(int_pts[cell2.source_index()].second);
    origin_x = ((p1_x + p2_x) * 0.5);
    origin_y = ((p1_y + p2_y) * 0.5);
    direction_x = (p1_y - p2_y);
    direction_y = (p2_x - p1_x);
  } else {
    // This case should never happen for point maps.
    std::cerr << "Warning! one clipInfiniteEdge cells contains a segment!" << std::endl;
    return false;
  }
  double side = xmax - xmin;
  double koef = side / (std::max)(fabs(direction_x), fabs(direction_y));
  if (edge.vertex0() == NULL) {
    x0 = origin_x - direction_x * koef;
    y0 = origin_y - direction_y * koef;
  } else {
    x0 = edge.vertex0()->x();
    y0 = edge.vertex0()->y();
  }
  if (edge.vertex1() == NULL) {
    x1 = origin_x + direction_x * koef;
    y1 = origin_y + direction_y * koef;
  } else {
    x1 = edge.vertex1()->x();
    y1 = edge.vertex1()->y();
  }
  return this->clipToBB(x0, y0, x1, y1, xmin, ymin, xmax, ymax);
}

bool ThiessenPolygon::clipFiniteEdge(const VD::edge_type& edge, std::vector<std::pair<int, int> >& int_pts,
                                     const double& xmin, const double& ymin, const double& xmax, const double& ymax,
                                     double& x0, double& y0, double& x1, double& y1) {
  // we know that edge is finite, so both vertex0 and vertex1 are defined
  x0 = edge.vertex0()->x();
  y0 = edge.vertex0()->y();
  x1 = edge.vertex1()->x();
  y1 = edge.vertex1()->y();
  return this->clipToBB(x0, y0, x1, y1, xmin, ymin, xmax, ymax);
}

// Cohen–Sutherland clipping algorithm clips a line from
// P0 = (x0, y0) to P1 = (x1, y1) against a rectangle with
// diagonal from (xmin, ymin) to (xmax, ymax).
// Based on http://en.wikipedia.org/wiki/Cohen-Sutherland_algorithm
// return false if line segment outside of bounding box
bool ThiessenPolygon::clipToBB(double& x0, double& y0, double& x1, double& y1, const double& xmin, const double& ymin,
                               const double& xmax, const double& ymax) {
  // compute outcodes for P0, P1,
  // and whatever point lies outside the clip rectangle
  int outcode0 = this->computeOutCode(x0, y0, xmin, ymin, xmax, ymax);
  int outcode1 = this->computeOutCode(x1, y1, xmin, ymin, xmax, ymax);
  bool accept = false;

  while (true) {
    if (!(outcode0 | outcode1)) {
      // Bitwise OR is 0. Trivially accept and get out of loop
      accept = true;
      break;
    } else if (outcode0 & outcode1) {
      // Bitwise AND is not 0. Trivially reject and get out of loop
      break;
    } else {
      // failed both tests, so calculate the line segment to clip
      // from an outside point to an intersection with clip edge
      double x, y;

      // At least one endpoint is outside the clip rectangle; pick it.
      int outcodeOut = outcode0 ? outcode0 : outcode1;

      // Now find the intersection point;
      // use formulas y = y0 + slope * (x - x0),
      //   x = x0 + (1 / slope) * (y - y0)
      if (outcodeOut & TOP) {
        // point is above the clip rectangle
        x = x0 + (x1 - x0) * (ymax - y0) / (y1 - y0);
        y = ymax;
      } else if (outcodeOut & BOTTOM) {
        // point is below the clip rectangle
        x = x0 + (x1 - x0) * (ymin - y0) / (y1 - y0);
        y = ymin;
      } else if (outcodeOut & RIGHT) {
        // point is to the right of clip rectangle
        y = y0 + (y1 - y0) * (xmax - x0) / (x1 - x0);
        x = xmax;
      } else if (outcodeOut & LEFT) {
        // point is to the left of clip rectangle
        y = y0 + (y1 - y0) * (xmin - x0) / (x1 - x0);
        x = xmin;
      }

      // Now we move outside point to intersection point to clip
      // and get ready for next pass.
      if (outcodeOut == outcode0) {
        x0 = x;
        y0 = y;
        outcode0 = this->computeOutCode(x0, y0, xmin, ymin, xmax, ymax);
      } else {
        x1 = x;
        y1 = y;
        outcode1 = this->computeOutCode(x1, y1, xmin, ymin, xmax, ymax);
      }
    }
  }
  return accept;
}

int ThiessenPolygon::computeOutCode(const double& x, const double& y, const double& xmin, const double& ymin,
                                    const double& xmax, const double& ymax) {
  // Based on http://en.wikipedia.org/wiki/Cohen-Sutherland_algorithm
  int code = INSIDE;  // initialised as being inside of clip window

  if (x < xmin)  // to the left of clip window
    code |= LEFT;
  else if (x > xmax)  // to the right of clip window
    code |= RIGHT;
  if (y < ymin)  // below the clip window
    code |= BOTTOM;
  else if (y > ymax)  // above the clip window
    code |= TOP;

  return code;
}

void ThiessenPolygon::createPolygonFromPoints(int edge_cnt, ThiessenPoint* pts, Polygon& poly) {
  std::vector<double> x;
  std::vector<double> y;
  for (int i = 0; i < edge_cnt; i++) {
    x.push_back(pts[i].x);
    y.push_back(pts[i].y);
  }
  bool is_hole = false;
  poly.add(x, y, is_hole);
}