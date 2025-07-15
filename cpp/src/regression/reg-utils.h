// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project


#ifndef REG_UTILS_H
#define REG_UTILS_H

#include "regression/dense-vector.h"
#include "regression/diagnostic-report.h"

#define geoda_sqr(x) ((x) * (x))

double fprob(int dfnum, int dfden, double F);
double *JarqueBera(double *e, long n, long k);

// void Compute_MoranI(geoda::GalElement *g, double *resid, int dim, double *rst);
// void Compute_RSLmError(geoda::GalElement *g, double *resid, int dim, double *rst, double t);

// void Compute_RSLmErrorRobust(geoda::GalElement *g, double **cov, DenseVector y, DenseVector *x, DenseVector ols,
//                              double *resid, int dim, int expl, double *rst, double t);

// void Compute_RSLmLag(geoda::GalElement *g, double **cov, DenseVector y, DenseVector *x, DenseVector ols, double *resid,
//                      int dim, int expl, double *rst, double t);

// void Compute_RSLmLagRobust(geoda::GalElement *g, double **cov, DenseVector y, DenseVector *x, DenseVector ols,
//                            double *resid, int dim, int expl, double *rst, double t);

// void Compute_RSLmSarma(geoda::GalElement *g, double **cov, DenseVector y, DenseVector *x, DenseVector ols,
//                        double *resid, int dim, int expl, double *rst, double t);

bool ordinaryLS(DenseVector &y, DenseVector *X, double **&cov, double *resid, DenseVector &ols);

extern double product(const double *v1, const double *v2, const int &sz);
extern double cdf(double x);
extern float betai(float a, float b, float x);
extern double MC_Condition_Number(double **, int, int);
extern double *BP_Test(double *resid, int obs, double **X, int expl, bool InclConst);
extern double *WhiteTest(int obs, int nvar, double *resid, double **X, bool InclConstant);

// bool classicalRegression(geoda::GalElement *g, int num_obs, double *Y, int dim, double **X, int expl,
//                          DiagnosticReport *dr, bool InclConstant, bool m_moranz, bool do_white_test);
// bool classicalRegression(geoda::GalElement *g, int num_obs, double *Y, int dim, double **X, int expl,
//                          DiagnosticReport *dr, bool InclConstant, bool m_moranz, bool do_white_test);
#endif  // REG_UTILS_H
