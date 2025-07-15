// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project

#include "regression/diagnostic-report.h"
#include "regression/mix.h"


DiagnosticReport::DiagnosticReport(long obs, int nvar, bool inclconst, bool w, int m)
    : nObs(obs), nVar(nvar), inclConstant(inclconst), model(m), hasWeight(w) {
  diagStatus = Allocate();
}

DiagnosticReport::~DiagnosticReport() {}

bool DiagnosticReport::GetDiagStatus() { return diagStatus; }

bool DiagnosticReport::Allocate() {
  if (nObs < nVar || nVar < 1) {
    std::string s = "The number of covariates should be more than the number of observations.";
    return false;
  }

  varNames.resize(nVar + 1);
  typedef double* double_ptr_type;
  cov = new double_ptr_type[nVar + 3];
  for (int i = 0; i < nVar; i++) {
    cov[i] = new double[nVar + 3];
  }

  coeff = new double[nVar + 1];
  sterr = new double[nVar + 1];
  stats = new double[nVar + 1];
  probs = new double[nVar + 1];
  bptest = new double[6];
  alloc(resid, nObs + 1);
  yhat = new double[nObs + 1];
  eigval = new double[nVar];

  if (resid == NULL) {
    std::string s = "Not enough memory!";
    return false;
  }

  if (model == 2)  // lag
  {
    rho = new double[4];
    sbptest = new double[3];
    lr_test = new double[3];
    lm_test = new double[3];
    prederr = new double[nObs];
  } else if (model == 3)  // error
  {
    lambda = new double[4];
    sbptest = new double[3];
    lr_test = new double[3];
    lm_test = new double[3];
    lrcf_test = new double[3];
    wald_test = new double[3];
    prederr = new double[nObs];
  } else  // ols
  {
    moranI = new double[3];
    jbtest = new double[3];
    kbtest = new double[3];
    white = new double[3];
    if (hasWeight) {
      lmlag = new double[3];
      lmerr = new double[3];
      lmlagr = new double[3];
      lmerrr = new double[3];
      lmsarma = new double[3];
      kelrob = new double[3];
    }
  }
  return true;
}

void DiagnosticReport::SetDiagStatus(bool status) { diagStatus = status; }

void DiagnosticReport::release_Var() {
  for (int i = 0; i < nVar; i++) {
    release(&cov[i]);
  }
  release(&cov);

  release(&coeff);
  release(&sterr);
  release(&stats);
  release(&probs);
  release(&bptest);
  release(&eigval);

  if (model == 2)  // lag
  {
    release(&rho);
    release(&sbptest);
    release(&lr_test);
    release(&lm_test);
  } else if (model == 3)  // error
  {
    release(&lambda);
    release(&sbptest);
    release(&lr_test);
    release(&lm_test);
    release(&lrcf_test);
    release(&wald_test);
  } else  // ols
  {
    release(&moranI);
    release(&jbtest);
    release(&kbtest);
    release(&white);
    if (hasWeight) {
      release(&lmlag);
      release(&lmerr);
      release(&lmlagr);
      release(&lmerrr);
      release(&lmsarma);
      release(&kelrob);
    }
  }
}
