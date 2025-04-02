import { useState, useEffect } from 'react'
import { quantileBreaks } from '@geoda/core'
import './App.css'

function App() {
  const [breaks, setBreaks] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [numBreaks, setNumBreaks] = useState(5)
  const [data, setData] = useState<number[]>([])
  const [customData, setCustomData] = useState('1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20')

  useEffect(() => {
    async function calculateBreaks() {
      try {
        setLoading(true)
        const result = await quantileBreaks(numBreaks, data)
        setBreaks(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (data.length > 0) {
      calculateBreaks()
    }
  }, [numBreaks, data])

  const handleCustomDataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomData(e.target.value)
  }

  const handleCustomDataSubmit = () => {
    try {
      const newData = customData
        .split(',')
        .map(num => parseFloat(num.trim()))
        .filter(num => !isNaN(num))
      setData(newData)
    } catch (err) {
      setError('Invalid data format. Please enter comma-separated numbers.')
    }
  }

  const handleNumBreaksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (value > 0) {
      setNumBreaks(value)
    }
  }

  return (
    <div className="container">
      <h1>Geoda Quantile Breaks Example</h1>
      
      <div className="controls">
        <div className="input-group">
          <label htmlFor="numBreaks">Number of Breaks:</label>
          <input
            type="number"
            id="numBreaks"
            value={numBreaks}
            onChange={handleNumBreaksChange}
            min="2"
            max="10"
          />
        </div>

        <div className="input-group">
          <label htmlFor="customData">Custom Data (comma-separated):</label>
          <textarea
            id="customData"
            value={customData}
            onChange={handleCustomDataChange}
            placeholder="Enter comma-separated numbers"
          />
          <button onClick={handleCustomDataSubmit}>Update Data</button>
        </div>
      </div>

      {error && <div className="error">Error: {error}</div>}

      {data.length > 0 && (
        <div className="results">
          <h2>Data Summary</h2>
          <p>Total values: {data.length}</p>
          <p>Min: {Math.min(...data).toFixed(2)}</p>
          <p>Max: {Math.max(...data).toFixed(2)}</p>
          
          <h2>Quantile Breaks:</h2>
          <div className="breaks-container">
            {breaks.map((breakValue: number, index: number) => (
              <div key={index} className="break-item">
                <span className="break-label">Break {index + 1}:</span>
                <span className="break-value">{breakValue.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App 