#include <blaswrap.h>
#include <f2c.h>
#include <stdio.h>

#include "regression/regression.h"

extern "C" int dgesvd_(char *jobu, char *jobvt, integer *m, integer *n, doublereal *a, integer *lda, doublereal *s,
                       doublereal *u, integer *ldu, doublereal *vt, integer *ldvt, doublereal *work, integer *lwork,
                       integer *info);

float dot_product() {
double** AA = new double*[3];
for (int i = 0; i < 3; i++) {
    AA[i] = new double[3];
}

AA[0][0] = 2.0;
AA[0][1] = -1.0;
AA[0][2] = 0.0;
AA[1][0] = 0.0;
AA[1][1] = 2.0;
AA[1][2] = -1.0;
AA[2][0] = 0.0;
AA[2][1] = 0.0;
AA[2][2] = 2.0;

  double B[3 * 3] = {2.0, -1.0, 0.0, 0, 2.0, -1.0, 0.0, 0, 2.0};

  double C[3 * 3] = {2.0, -1.0, 0.0, 0, 2.0, -1.0, 0.0, 0, 2.0};

  long m = 3;
  double **U = new double *[m];
  for (int i = 0; i < m; i++) {
    U[i] = new double[m];
  }

  double **Us1 = new double *[m];
  for (int i = 0; i < m; i++) {
    Us1[i] = new double[m];
  }
  double **Us2 = new double *[m];
  for (int i = 0; i < m; i++) {
    Us2[i] = new double[m];
  }
  double *sigmas = new double[m];
  long lwork = 10 * m;
  double *work = new double[lwork];
  char specU = 'A'; /* "all M columns of U are returned in array
                     * * U" */
  char specV = 'N'; /* "no rows of V**T are computed" */
  long lapack_info;
  double a = 1.0;
  double b = 0.0;
  int i, j;

  double **S = 0;
  dgesvd_(&specU, &specV, &m, &m, AA[0], &m, sigmas, U[0], &m, NULL, &m, work, &lwork, &lapack_info);
  if (lapack_info != 0) {
    delete[] U;
    delete[] Us1;
    delete[] Us2;
    delete[] sigmas;
    delete[] work;

    return lapack_info;
  }

  return 0;
}
