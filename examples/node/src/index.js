const { GeoDa } = require('@geoda/core');

// Example data
const data = {
    values: [1, 2, 3, 4, 5],
    geometry: {
        type: "Polygon",
        coordinates: [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]]
    }
};

async function main() {
    try {
        // Create a new GeoDa instance
        const geoda = new GeoDa();
        
        // Load data
        await geoda.loadData(data);
        
        // Get basic statistics
        const stats = await geoda.getStatistics();
        console.log('Basic Statistics:', stats);
        
        // Get spatial weights
        const weights = await geoda.getSpatialWeights();
        console.log('Spatial Weights:', weights);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

main(); 