// SPDX-License-Identifier: MIT
// Copyright contributors to the geodalib project


#ifndef __GEODA_CENTER_DIAGNOSTIC_REPORT_H__
#define __GEODA_CENTER_DIAGNOSTIC_REPORT_H__

#include <string>
#include <vector>

class DiagnosticReport {
 public:
  explicit DiagnosticReport(long obs, int nvar, bool inclconst, bool w, int model);
  virtual ~DiagnosticReport();

  long GetNoObservation() { return nObs; }
  int GetNoVariable() { return nVar; }
  bool IncludeConstant() { return inclConstant; }
  std::string GetXVarName(int i) { return varNames[i]; }
  double* GetCoefficients() { return coeff; }
  double GetCoefficient(int i) { return coeff[i]; }
  double* GetStdErrors() { return sterr; }
  double GetStdError(int i) { return sterr[i]; }
  double* GetZValues() { return stats; }
  double GetZValue(int i) { return stats[i]; }
  double* GetProbabilities() { return probs; }
  double GetProbability(int i) { return probs[i]; }
  double* GetRho() { return rho; }
  double* GetLambda() { return lambda; }
  double GetR2() { return r2; }
  double GetR2_adjust() { return r2_a; }
  double GetR2_buse() { return r2_buse; }
  double GetLIK() { return lik; }
  double GetAIC() { return aic; }
  double GetOLS_SC() { return ols_sc; }
  double GetRSS() { return rss; }
  double GetFtest() { return ftest; }
  double GetFtestProb() { return ftestP; }
  double GetSIQ_SQ() { return sig_sq; }
  double GetSIQ_SQLM() { return sig_sqlm; }
  double GetConditionNumber() { return condnumber; }

  double GetJBtestValue(int i) { return jbtest[i]; }
  double* GetJBtest() { return jbtest; }
  double GetBPtestValue(int i) { return bptest[i]; }
  double* GetBPtest() { return bptest; }
  double GetSpatialBPtestValue(int i) { return sbptest[i]; }
  double* GetSpatialBPtest() { return sbptest; }
  double GetKBtestValue(int i) { return kbtest[i]; }
  double* GetKBtest() { return kbtest; }
  double* GetWhitetest() { return white; }
  double GetMoranIValue(int i) { return moranI[i]; }
  double* GetMoranI() { return moranI; }
  double GetLMLAGValue(int i) { return lmlag[i]; }
  double* GetLMLAG() { return lmlag; }
  double GetLMLAGRobValue(int i) { return lmlagr[i]; }
  double* GetLMLAGRob() { return lmlagr; }
  double GetLMERRValue(int i) { return lmerr[i]; }
  double* GetLMERR() { return lmerr; }
  double GetLMERRRobValue(int i) { return lmerrr[i]; }
  double* GetLMERRRob() { return lmerrr; }
  double GetLMSarmaValue(int i) { return lmsarma[i]; }
  double* GetLMSarma() { return lmsarma; }
  double GetKelRobinValue(int i) { return kelrob[i]; }
  double* GetKelRobin() { return kelrob; }
  double* GetResidual() { return resid; }
  double** GetCovariance() { return cov; }
  double GetCovariance(int i, int j) { return cov[i][j]; }
  double* GetEigVal() { return eigval; }
  double* GetYHAT() { return yhat; }
  double* GetPredError() { return prederr; }
  /// Likelihood Ratio Test for spatial lag/error dependence
  double* GetLRTest() { return lr_test; }
  double GetLRTestValue(int i) { return lr_test[i]; }
  /// Lagrange Multiplier test for spatial lag/error dep
  double* GetLMTest() { return lm_test; }
  double GetLMTestValue(int i) { return lm_test[i]; }
  /// Test on common factor hyphothesis
  double* GetLRTest_CF() { return lrcf_test; }
  double* GetWaldTest() { return wald_test; }
  double GetMeanY() { return mean_Y; }
  double GetSDevY() { return sdev_Y; }

 protected:
  int model;  // 1:OLS; 2:Lag; 3:Errror
  bool inclConstant, diagStatus, hasWeight;
  std::vector<std::string> varNames;
  long nObs;
  int nVar;
  double *resid, *yhat, *prederr, *eigval;
  double** cov;
  double *coeff, *sterr, *stats, *probs;
  double *rho, *lambda;
  double r2, r2_a, lik, aic, ols_sc, rss, r2_buse;
  double ftest, ftestP, sig_sq, sig_sqlm;
  double condnumber;
  double *moranI, *jbtest, *kbtest, *bptest, *sbptest, *white;
  double *lmlag, *lmerr, *lmlagr, *lmerrr, *lmsarma, *kelrob;
  double *lr_test, *lm_test, *lrcf_test, *wald_test;
  double mean_Y, sdev_Y;

 public:
  void release_Var();
  void SetXVarNames(int i, const std::string& vname) { varNames[i] = vname; }
  void SetResidual(int i, double r) { resid[i] = r; }
  void SetYHat(int i, double yh) { yhat[i] = yh; }
  void SetPredErr(int i, double pe) { prederr[i] = pe; }
  void SetEigVal(int i, double ev) { eigval[i] = ev; }
  void SetCovar(int i, int j, double co) { cov[i][j] = co; }
  void SetCoeff(int i, double coef) { coeff[i] = coef; }
  void SetStdError(int i, double se) { sterr[i] = se; }
  void SetZValue(int i, double zval) { stats[i] = zval; }
  void SetProbVal(int i, double pv) { probs[i] = pv; }
  void SetR2Fit(double rtwo) { r2 = rtwo; }
  void SetR2Adjust(double r2a) { r2_a = r2a; }
  void SetLIK(double lk) { lik = lk; }
  void SetAIC(double akaik) { aic = akaik; }
  void SetSC(double sc) { ols_sc = sc; }
  void SetRSS(double r) { rss = r; }
  void SetR2Buse(double r2b) { r2_buse = r2b; }
  void SetFTest(double ft) { ftest = ft; }
  void SetFTestProb(double ftp) { ftestP = ftp; }
  void SetSigSq(double ssq) { sig_sq = ssq; }
  void SetSigSqLm(double ssqlm) { sig_sqlm = ssqlm; }
  void SetCondNumber(double cn) { condnumber = cn; }
  void SetMoranI(int i, double coef) { moranI[i] = coef; }
  void SetJBTest(int i, double coef) { jbtest[i] = coef; }
  void SetKBTest(int i, double coef) { kbtest[i] = coef; }
  void SetBPTest(int i, double coef) { bptest[i] = coef; }
  void SetSBPTest(int i, double coef) { sbptest[i] = coef; }
  void SetWhiteTest(int i, double coef) { white[i] = coef; }
  void SetLmLag(int i, double coef) { lmlag[i] = coef; }
  void SetLmError(int i, double coef) { lmerr[i] = coef; }
  void SetLmLagRobust(int i, double coef) { lmlagr[i] = coef; }
  void SetLmErrRobust(int i, double coef) { lmerrr[i] = coef; }
  void SetLmSarma(int i, double coef) { lmsarma[i] = coef; }
  void SetKelijianRob(int i, double coef) { kelrob[i] = coef; }
  void SetLR_Test(int i, double coef) { lr_test[i] = coef; }
  void SetLM_Test(int i, double coef) { lm_test[i] = coef; }
  void SetLR_CommFact(int i, double coef) { lrcf_test[i] = coef; }
  void SetWaldTest(int i, double coef) { wald_test[i] = coef; }
  void SetMeanY(double mY) { mean_Y = mY; }
  void SetSDevY(double sdY) { sdev_Y = sdY; }
  bool GetDiagStatus();

 private:
  void SetDiagStatus(bool status);
  bool Allocate();
};

#endif
