const { quantileBreaks } = require('@geoda/core');

// Example data
const data = [1, 2, 3, 4, 5];

async function main() {
  try {
    console.log('Data:', data);
    const breaks = await quantileBreaks(2, data);
    console.log('Breaks:', breaks);
    return breaks;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Only run if this file is being run directly
if (require.main === module) {
  main();
}

module.exports = { main, quantileBreaks };
