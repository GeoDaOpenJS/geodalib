import React, { useEffect, useState } from 'react';
import { spatialLagRegression } from '@geoda/regression';
import { TEST_HR60, TEST_QUEEN_WEIGHTS, TEST_PO60, TEST_UE60 } from './data';

function App() {
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function calculateRegression() {
      try {
        // Create a simple weights matrix for demonstration
        // In a real application, you would use actual spatial weights
        const n = TEST_PO60.length;

        // Run spatial lag regression
        const regressionResults = await spatialLagRegression({
          y: TEST_HR60, // Unemployment rate as dependent variable
          x: [TEST_PO60, TEST_UE60], // Log population as independent variable
          weights: TEST_QUEEN_WEIGHTS, // Spatial weights matrix
          xNames: ['PO60', 'UE60'],
          yName: 'HR60',
          datasetName: 'natregimes',
        });

        setResults(regressionResults);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    }

    calculateRegression();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!results) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Spatial Lag Regression Example</h1>
      
      <h2>Model Inputs</h2>

      <pre>
        HR60 ~ PO60 + UE60
      </pre>

      <div style={{ marginBottom: '20px' }}>
        <h3>Dependent Variable</h3>
        <p>Name: {results.dependentVariable}</p>
        <p>Sample size: {TEST_HR60.length}</p>
        <p>First 5 values: {TEST_HR60.slice(0, 5).join(', ')}</p>
        
        <h3>Independent Variables</h3>
        <p>Name: {results.independentVariables[0]}</p>
        <p>Sample size: {TEST_PO60.length}</p>
        <p>First 5 values: {TEST_PO60.slice(0, 5).join(', ')}</p>
        <p>Name: {results.independentVariables[1]}</p>
        <p>Sample size: {TEST_UE60.length}</p>
        <p>First 5 values: {TEST_UE60.slice(0, 5).join(', ')}</p>
        <h3>Dataset Information</h3>
        <p>Dataset name: {results.datasetName}</p>
      </div>

      <h2>Model Results</h2>
      <pre
        style={{
          backgroundColor: '#f5f5f5',
          padding: '15px',
          borderRadius: '5px',
        }}
      >
        {JSON.stringify(results, null, 2)}
      </pre>
    </div>
  );
}

export default App;
