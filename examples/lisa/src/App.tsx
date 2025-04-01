import { useEffect, useState } from 'react';
import { localMoran } from '@geoda/lisa';

interface LocalMoranResult {
  isValid: boolean;
  pValues: number[];
  lagValues: number[];
  lisaValues: number[];
  clusters: number[];
}

function App() {
  const [result, setResult] = useState<LocalMoranResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculateLocalMoran = async () => {
      const data = [3.0, 3.0, 0.0, 9.0, 8.0, 8.5];
      const neighbors = [[1], [0], [], [4, 5], [3, 5], [3, 4]];
      const permutation = 99;

      const result = await localMoran({ data, neighbors, permutation });
      setResult(result);
      setLoading(false);
    };

    calculateLocalMoran();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Local Moran Statistics Example</h1>
      
      <div className="results">
        <div className="result-section">
          <h2>Input Data</h2>
          <p>Values: [3.0, 3.0, 0.0, 9.0, 8.0, 8.5]</p>
          <p>Neighbors: [[1], [0], [], [4, 5], [3, 5], [3, 4]]</p>
        </div>

        {result && (
          <>
            <div className="result-section">
              <h2>Results</h2>
              <p>Valid: {result.isValid.toString()}</p>
            </div>

            <div className="result-section">
              <h2>P-Values</h2>
              <p>{result.pValues.join(', ')}</p>
            </div>

            <div className="result-section">
              <h2>Lag Values</h2>
              <p>{result.lagValues.join(', ')}</p>
            </div>

            <div className="result-section">
              <h2>LISA Values</h2>
              <p>{result.lisaValues.join(', ')}</p>
            </div>

            <div className="result-section">
              <h2>Clusters</h2>
              <p>{result.clusters.join(', ')}</p>
            </div>
          </>
        )}
      </div>

      <style>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        h1 {
          color: #333;
          text-align: center;
        }

        .results {
          display: grid;
          gap: 20px;
          margin-top: 20px;
        }

        .result-section {
          background: #f5f5f5;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        h2 {
          color: #444;
          margin-top: 0;
        }

        p {
          margin: 10px 0;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}

export default App; 