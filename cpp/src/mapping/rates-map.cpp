#include "mapping/mapping.h"

std::vector<double> geoda::raw_rate(const std::vector<double>& P, const std::vector<double>& E,
                                    const std::vector<int>& undefs) {
  double SP = 0.0;
  double SE = 0.0;
  size_t obs = P.size();

  std::vector<double> results(obs, 0.0);

  for (size_t i = 0; i < obs; i++) {
    if (undefs[i] == 1) {
      continue;
    }

    SP += P[i];
    SE += E[i];

    if (P[i] > 0) {
      results[i] = E[i] / P[i];
    }
  }

  return results;
}

std::vector<double> geoda::excess_risk(const std::vector<double>& P, const std::vector<double>& E,
                                       const std::vector<int>& undefs) {
  double SP = 0.0;
  double SE = 0.0;
  size_t obs = P.size();

  std::vector<double> results(obs, 0.0);

  for (size_t i = 0; i < obs; i++) {
    if (undefs[i] == 1) {
      continue;
    }
    SP += P[i];
    SE += E[i];
  }

  double lambda = 1.0;
  if (SP > 0) {
    lambda = SE / SP;
  }

  for (size_t i = 0; i < obs; i++) {
    if (undefs[i] == 1) {
      results[i] = 0.0;
      continue;
    }
    double E_hat = P[i] * lambda;
    if (E_hat > 0) {
      results[i] = E[i] / E_hat;
    } else {
      results[i] = 0.0;
    }
  }

  return results;
}

std::vector<double> geoda::empirical_bayes(const std::vector<double>& P, const std::vector<double>& E,
                                           const std::vector<int>& undefs) {
  double SP = 0.0;
  double SE = 0.0;
  size_t obs = P.size();

  std::vector<double> results(obs, 0.0);
  std::vector<double> pi_raw(obs, 0.0);
  std::vector<bool> undefined(obs, false);

  // Convert undefs to boolean and initialize
  for (size_t i = 0; i < obs; i++) {
    if (undefs[i] == 1) {
      undefined[i] = true;
      results[i] = 0.0;
      pi_raw[i] = 0.0;
      continue;
    }

    SP += P[i];
    SE += E[i];

    if (P[i] > 0) {
      pi_raw[i] = E[i] / P[i];
    } else {
      undefined[i] = true;
      results[i] = 0.0;
    }
  }

  // Calculate theta1 (global rate)
  double theta1 = 1.0;
  if (SP > 0) {
    theta1 = SE / SP;
  }

  // Count valid observations
  int valid_obs = 0;
  for (size_t i = 0; i < obs; i++) {
    if (!undefined[i]) {
      valid_obs++;
    }
  }

  // Calculate pbar (average population)
  double pbar = SP / valid_obs;

  // Calculate theta2 (variance component)
  double q1 = 0.0;
  for (size_t i = 0; i < obs; i++) {
    if (!undefined[i]) {
      q1 += P[i] * (pi_raw[i] - theta1) * (pi_raw[i] - theta1);
    }
  }

  double theta2 = (q1 / SP) - (theta1 / pbar);

  // Ensure theta2 is non-negative
  if (theta2 < 0) {
    theta2 = 0.0;
  }

  // Apply empirical Bayes smoothing
  for (size_t i = 0; i < obs; i++) {
    if (!undefined[i]) {
      q1 = theta2 + (theta1 / P[i]);
      double w = (q1 > 0) ? theta2 / q1 : 1.0;
      results[i] = (w * pi_raw[i]) + ((1.0 - w) * theta1);
    }
  }

  return results;
}

std::vector<double> geoda::spatial_rate(const std::vector<std::vector<unsigned int>>& neighbors,
                                        const std::vector<double>& P, const std::vector<double>& E,
                                        const std::vector<int>& undefs) {
  size_t obs = P.size();
  std::vector<double> results(obs, 0.0);

  double SE = 0.0;
  double SP = 0.0;

  for (size_t i = 0; i < obs; i++) {
    SE = 0.0;
    SP = 0.0;
    results[i] = 0.0;

    if (undefs[i] == 1) continue;

    const auto& nbrs = neighbors[i];
    if (nbrs.size() > 0) {
      for (size_t j = 0; j < nbrs.size(); j++) {
        SE += E[nbrs[j]];
        SP += P[nbrs[j]];
      }

      if ((P[i] + SP) > 0) {
        results[i] = (E[i] + SE) / (P[i] + SP);
      }
    }
  }

  return results;
}

std::vector<double> geoda::spatial_empirical_bayes(const std::vector<std::vector<unsigned int>>& neighbors,
                                                   const std::vector<double>& P, const std::vector<double>& E,
                                                   const std::vector<int>& undefs) {
  size_t obs = P.size();
  std::vector<double> results(obs, 0.0);

  std::vector<double> pi_raw(obs, 0.0);

  for (size_t i = 0; i < obs; i++) {
    if (undefs[i] == 1) {
      continue;
    }
    if (P[i] > 0) {
      pi_raw[i] = E[i] / P[i];
    }
  }

  for (size_t i = 0; i < obs; i++) {
    if (undefs[i] == 1) {
      continue;
    }

    double SP = P[i];
    double SE = E[i];

    const auto& nbrs = neighbors[i];
    for (size_t j = 0; j < nbrs.size(); j++) {
      SP += P[nbrs[j]];
      SE += E[nbrs[j]];
    }

    double theta1 = 1.0;
    double theta2 = 0.0;

    if (SP > 0) {
      theta1 = SE / SP;
    }

    if (nbrs.size() > 0) {
      double pbar = SP / (nbrs.size() + 1);
      double q1 = P[i] * (pi_raw[i] - theta1) * (pi_raw[i] - theta1);
      bool has_undef = false;

      for (size_t j = 0; j < nbrs.size(); j++) {
        if (undefs[nbrs[j]] == 1) {
          has_undef = true;
          continue;
        }

        q1 += P[nbrs[j]] * (pi_raw[nbrs[j]] - theta1) * (pi_raw[nbrs[j]] - theta1);
      }

      if (!has_undef) {
        theta2 = (q1 / SP) - (theta1 / pbar);
        if (theta2 < 0) {
          theta2 = 0.0;
        }
        q1 = (theta2 + (theta1 / P[i]));
        double w = (q1 > 0) ? theta2 / q1 : 1.0;
        results[i] = (w * pi_raw[i]) + ((1.0 - w) * theta1);
      }
    }
  }

  return results;
}

std::vector<double> geoda::rate_standardize_empirical_bayes(const std::vector<double>& P, const std::vector<double>& E,
                                                            const std::vector<int>& undefs) {
  size_t obs = P.size();
  std::vector<double> results(obs, 0.0);
  std::vector<double> p(obs, 0.0);

  double sP = 0.0, sE = 0.0;

  // Convert undefs to boolean and compute pi (raw rates)
  for (size_t i = 0; i < obs; i++) {
    if (undefs[i] == 1) {
      continue;
    }

    if (P[i] == 0.0) {
      p[i] = 0.0;
    } else {
      sP += P[i];
      sE += E[i];
      p[i] = E[i] / P[i];
    }
  }

  // Check if total population is zero
  if (sP == 0.0) {
    return results;
  }

  const double b_hat = sE / sP;  // global rate

  // Compute a_hat (variance component)
  double obs_valid = 0.0;
  double gamma = 0.0;
  for (size_t i = 0; i < obs; i++) {
    if (undefs[i] == 0) {
      gamma += P[i] * ((p[i] - b_hat) * (p[i] - b_hat));
      obs_valid += 1.0;
    }
  }

  double a = (gamma / sP) - (b_hat / (sP / obs_valid));
  const double a_hat = a > 0 ? a : 0.0;

  // Compute standardized rates
  for (size_t i = 0; i < obs; i++) {
    if (undefs[i] == 0) {
      const double se = P[i] > 0 ? sqrt(a_hat + b_hat / P[i]) : 0.0;
      results[i] = se > 0 ? (p[i] - b_hat) / se : 0.0;
    }
  }

  return results;
}
