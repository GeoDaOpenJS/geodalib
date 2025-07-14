// SPDX-License-Identifier: MIT
// Copyright contributors to the geoda-lib project

#ifndef RND_H
#define RND_H

#include <cstdint>

namespace geoda {

/**
 * @brief Hash a 64-bit integer to a double value between 0 and 1
 * This is from the Thomas Wang's hash function, and has been copied from the legacy GeoDa code in order to 
 * replicate the results in GeoDa.
 * 
 * Note: for new implmentation of the random number generator, we should use Boost library instead.
 * 
 * @param key 64-bit integer to hash
 * @return double value between 0 and 1
 */
static double ThomasWangHashDouble(uint64_t key) {
  key = (~key) + (key << 21);  // key = (key << 21) - key - 1;
  key = key ^ (key >> 24);
  key = (key + (key << 3)) + (key << 8);  // key * 265
  key = key ^ (key >> 14);
  key = (key + (key << 2)) + (key << 4);  // key * 21
  key = key ^ (key >> 28);
  key = key + (key << 31);
  return 5.42101086242752217E-20 * key;
}

}  // namespace geoda

#endif  // RND_H
