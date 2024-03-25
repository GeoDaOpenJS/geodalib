
#ifndef __GEODA_CENTER_DIAGNOSTIC_REPORT_H__
#define __GEODA_CENTER_DIAGNOSTIC_REPORT_H__

#include <vector>
#include <string>

class DiagnosticReport {
 public:
  explicit DiagnosticReport(long obs, int nvar, bool inclconst, bool w, int model);
  virtual ~DiagnosticReport();

  long GetNoObservation() { return nObs; }
  int GetNoVariable() { return nVar; }
  bool IncludeConstant() { return inclConstant; }
  std::string GetXVarName(int i) { return varNames[i]; }

  std::vector<double> GetCoefficientsVec() { 
    // convert double* to std::vector<double>
    std::vector<double> coeff_vec(coeff, coeff + nVar);
    return coeff_vec;
  }
  double* GetCoefficients() { return coeff; }
  double GetCoefficient(int i) { return coeff[i]; }

  std::vector<double> GetStdErrorsVec() { 
    // convert double* to std::vector<double>
    std::vector<double> sterr_vec(sterr, sterr + nVar);
    return sterr_vec;
  }
  double* GetStdErrors() { return sterr; }

  double GetStdError(int i) { return sterr[i]; }

  std::vector<double> GetZValuesVec() { 
    // convert double* to std::vector<double>
    std::vector<double> stats_vec(stats, stats + nVar);
    return stats_vec;
  }
  double* GetZValues() { return stats; }

  double GetZValue(int i) { return stats[i]; }

  std::vector<double> GetProbabilitiesVec() { 
    // convert double* to std::vector<double>
    std::vector<double> probs_vec(probs, probs + nVar);
    return probs_vec;
  }
  double* GetProbabilities() { return probs; }

  double GetProbability(int i) { return probs[i]; }

  std::vector<double> GetRhoVec() { 
    // convert double* to std::vector<double>
    std::vector<double> rho_vec(rho, rho + 4);
    return rho_vec;
  }
  double* GetRho() { return rho; }

  std::vector<double> GetLambdaVec() { 
    // convert double* to std::vector<double>
    std::vector<double> lambda_vec(lambda, lambda + 4);
    return lambda_vec;
  }
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

  std::vector<double> GetJBtestVec() { 
    // convert double* to std::vector<double>
    std::vector<double> jbtest_vec(jbtest, jbtest + 3);
    return jbtest_vec;
  }
  double* GetJBtest() { return jbtest; }
  std::vector<double> GetBPtestVec() { 
    // convert double* to std::vector<double>
    std::vector<double> bptest_vec(bptest, bptest + 3);
    return bptest_vec;
  }
  double* GetBPtest() { return bptest; }
  std::vector<double> GetSpatialBPtestVec() { 
    // convert double* to std::vector<double>
    std::vector<double> sbptest_vec(sbptest, sbptest + 3);
    return sbptest_vec;
  }
  double* GetSpatialBPtest() { return sbptest; }
  std::vector<double> GetKBtestVec() { 
    // convert double* to std::vector<double>
    std::vector<double> kbtest_vec(kbtest, kbtest + 3);
    return kbtest_vec;
  }
  double* GetKBtest() { return kbtest; }
  std::vector<double> GetWhitetestVec() { 
    // convert double* to std::vector<double>
    std::vector<double> white_vec(white, white + 3);
    return white_vec;
  }
  double* GetWhitetest() { return white; }
  std::vector<double> GetMoranIVec() { 
    // convert double* to std::vector<double>
    std::vector<double> moranI_vec(moranI, moranI + 3);
    return moranI_vec;
  }
  double* GetMoranI() { return moranI; }
  std::vector<double> GetLMLAGVec() { 
    // convert double* to std::vector<double>
    std::vector<double> lmlag_vec(lmlag, lmlag + 3);
    return lmlag_vec;
  }
  double* GetLMLAG() { return lmlag; }
  std::vector<double> GetLMLAGRobVec() { 
    // convert double* to std::vector<double>
    std::vector<double> lmlagr_vec(lmlagr, lmlagr + 3);
    return lmlagr_vec;
  }
  double* GetLMLAGRob() { return lmlagr; }
  std::vector<double> GetLMERRVec() { 
    // convert double* to std::vector<double>
    std::vector<double> lmerr_vec(lmerr, lmerr + 3);
    return lmerr_vec;
  }
  double* GetLMERR() { return lmerr; }
  std::vector<double> GetLMERRRobVec() { 
    // convert double* to std::vector<double>
    std::vector<double> lmerrr_vec(lmerrr, lmerrr + 3);
    return lmerrr_vec;
  }
  double* GetLMERRRob() { return lmerrr; }
  std::vector<double> GetLMSarmaVec() { 
    // convert double* to std::vector<double>
    std::vector<double> lmsarma_vec(lmsarma, lmsarma + 3);
    return lmsarma_vec;
  }
  double* GetLMSarma() { return lmsarma; }
  std::vector<double> GetKelRobinVec() { 
    // convert double* to std::vector<double>
    std::vector<double> kelrob_vec(kelrob, kelrob + 3);
    return kelrob_vec;
  }
  double* GetKelRobin() { return kelrob; }
  std::vector<double> GetResidualVec() { 
    // convert double* to std::vector<double>
    std::vector<double> resid_vec(resid, resid + nObs);
    return resid_vec;
  }
  double* GetResidual() { return resid; }
  std::vector<std::vector<double>> GetCovarianceVec() { 
    // convert double** to std::vector<std::vector<double>>
    std::vector<std::vector<double>> cov_vec;
    for (int i = 0; i < nVar; i++) {
      std::vector<double> cov_row(cov[i], cov[i] + nVar);
      cov_vec.push_back(cov_row);
    }
    return cov_vec;
  }
  double** GetCovariance() { return cov; }
  double GetCovariance(int i, int j) { return cov[i][j]; }
  std::vector<double> GetEigValVec() { 
    // convert double* to std::vector<double>
    std::vector<double> eigval_vec(eigval, eigval + nVar);
    return eigval_vec;
  }
  double* GetEigVal() { return eigval; }
  std::vector<double> GetYHATVec() { 
    // convert double* to std::vector<double>
    std::vector<double> yhat_vec(yhat, yhat + nObs);
    return yhat_vec;
  }
  double* GetYHAT() { return yhat; }
  std::vector<double> GetPredErrorVec() { 
    // convert double* to std::vector<double>
    std::vector<double> prederr_vec(prederr, prederr + nObs);
    return prederr_vec;
  }
  double* GetPredError() { return prederr; }
  std::vector<double> GetLRTestVec() { 
    // convert double* to std::vector<double>
    std::vector<double> lr_test_vec(lr_test, lr_test + 3);
    return lr_test_vec;
  }
  /// Likelihood Ratio Test for spatial lag/error dependence
  double* GetLRTest() { return lr_test; }
  std::vector<double> GetLMTestVec() { 
    // convert double* to std::vector<double>
    std::vector<double> lm_test_vec(lm_test, lm_test + 3);
    return lm_test_vec;
  }
  /// Lagrange Multiplier test for spatial lag/error dep
  double* GetLMTest() { return lm_test; }
  std::vector<double> GetLRTest_CFVec() { 
    // convert double* to std::vector<double>
    std::vector<double> lrcf_test_vec(lrcf_test, lrcf_test + 3);
    return lrcf_test_vec;
  }
  /// Test on common factor hyphothesis
  double* GetLRTest_CF() { return lrcf_test; }
  std::vector<double> GetWaldTestVec() { 
    // convert double* to std::vector<double>
    std::vector<double> wald_test_vec(wald_test, wald_test + 3);
    return wald_test_vec;
  }
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
