// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

#ifndef __GEODA_CENTER_ML_IM_H__
#define __GEODA_CENTER_ML_IM_H__

#include "regression/SparseMatrix.h"
#include "regression/dense-vector.h"
#include "regression/lite2.h"

const int SMALL_DIM = 500;
const int ASYM_DIM = 1000;

double SimulationLag(const geoda::GalElement *weight, int num_obs, int Precision, const double rho, double *my_Y,
                     double **my_X, const int deps, bool InclConstant, double *Lik, double p_bar_min_fraction,
                     double p_bar_max_fraction);

double SimulationError(const geoda::GalElement *weight, int num_obs, int Precision, const double rho, const double *my_Y,
                       double **my_X, const int deps, double *&beta, bool InclConstant, double *Lik,
                       double p_bar_min_fraction, double p_bar_max_fraction);

bool OLS(DenseVector &y, DenseVector *X, const bool IncludeConst, double **&cov, double *resid, DenseVector &ols);

bool OLSS(DenseVector &y, DenseVector *X, const bool IncludeConst, double **&cov, double **&ocov, double *resid,
          DenseVector &ols);

bool OLS(Iterator<VALUE> y, Iterator<WVector> X, const bool IncludeConst, Vector<WVector> &cov, WVector &resid,
         WVector &ols);

// bool ordinaryLS(DenseVector &y, DenseVector *X, double **&cov, double *resid, DenseVector &ols);

#endif
