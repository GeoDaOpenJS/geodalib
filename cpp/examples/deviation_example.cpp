#include <iostream>
#include <vector>
#include <iomanip>
#include "../src/utils/deviation.h"

void print_vector(const std::vector<double>& vec, const std::string& name) {
    std::cout << name << ": [";
    for (size_t i = 0; i < vec.size(); ++i) {
        if (i > 0) std::cout << ", ";
        std::cout << std::fixed << std::setprecision(2) << vec[i];
    }
    std::cout << "]" << std::endl;
}

void print_bool_vector(const std::vector<bool>& vec, const std::string& name) {
    std::cout << name << ": [";
    for (size_t i = 0; i < vec.size(); ++i) {
        if (i > 0) std::cout << ", ";
        std::cout << (vec[i] ? "T" : "F");
    }
    std::cout << "]" << std::endl;
}

int main() {
    std::cout << "=== Deviation from Mean Examples ===" << std::endl << std::endl;
    
    // Example 1: Basic usage
    std::cout << "Example 1: Basic usage" << std::endl;
    std::vector<double> data1 = {1.0, 2.0, 3.0, 4.0, 5.0};
    std::vector<bool> undef1 = {false, false, false, false, false};
    
    print_vector(data1, "Original data");
    print_bool_vector(undef1, "Undefined flags");
    
    deviation_from_mean(data1, undef1);
    
    print_vector(data1, "After deviation");
    std::cout << std::endl;
    
    // Example 2: With undefined values
    std::cout << "Example 2: With some undefined values" << std::endl;
    std::vector<double> data2 = {1.0, 2.0, 3.0, 4.0, 5.0};
    std::vector<bool> undef2 = {true, false, false, false, true};
    
    print_vector(data2, "Original data");
    print_bool_vector(undef2, "Undefined flags");
    
    deviation_from_mean(data2, undef2);
    
    print_vector(data2, "After deviation");
    std::cout << "Note: Values at positions 0 and 4 remain unchanged (undefined)" << std::endl;
    std::cout << std::endl;
    
    // Example 3: Using the copy version
    std::cout << "Example 3: Using the copy version (original preserved)" << std::endl;
    std::vector<double> original = {10.0, 20.0, 30.0};
    std::vector<bool> undef3 = {false, false, false};
    
    print_vector(original, "Original data");
    
    std::vector<double> result = deviation_from_mean_copy(original, undef3);
    
    print_vector(original, "Original (unchanged)");
    print_vector(result, "Deviation result");
    std::cout << std::endl;
    
    // Example 4: Error handling
    std::cout << "Example 4: Error handling" << std::endl;
    std::vector<double> data4 = {1.0, 2.0, 3.0};
    std::vector<bool> undef4 = {true, true, true}; // All undefined
    
    try {
        deviation_from_mean(data4, undef4);
    } catch (const std::runtime_error& e) {
        std::cout << "Caught expected error: " << e.what() << std::endl;
    }
    
    // Example 5: Mismatched sizes
    std::vector<double> data5 = {1.0, 2.0, 3.0};
    std::vector<bool> undef5 = {false, false}; // Wrong size
    
    try {
        deviation_from_mean(data5, undef5);
    } catch (const std::invalid_argument& e) {
        std::cout << "Caught expected error: " << e.what() << std::endl;
    }
    
    return 0;
} 