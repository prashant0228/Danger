import React, { useState } from 'react';
import axios from 'axios';
import './task1.css';

function Task1() {
  const [countOfSupportAndConfidence, setCountOfSupportAndConfidence] = useState(3);
  const [supportAndConfidence, setSupportAndConfidence] = useState([
    { support: '0.11', confidence: '0.51' },
    { support: '0.12', confidence: '0.52' },
    { support: '0.13', confidence: '0.52' }
  ]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const runAssociationRules = async () => {
    try {
      const response = await axios.post('http://localhost:8000/run_association_rules/', {
        support_values: supportAndConfidence.map(item => item.support),
        confidence_values: supportAndConfidence.map(item => item.confidence),
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response from the server:', response.data);

      if (Array.isArray(response.data)) {
        setResults(response.data);
        setError(null);  // Clear any previous errors
      } else {
        setError('Invalid response format');
      }
    } catch (error) {
      console.error('Error:', error.response?.data?.error || 'Unknown error');
      setError('Error occurred while fetching results');
    }
  };

  const handleCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setCountOfSupportAndConfidence(count);
  
    // Reset the input fields to the default values with a difference of 0.01
    const newSupportAndConfidence = Array.from({ length: count }, (_, index) => ({
      support: (0.1 + index * 0.01).toFixed(2),
      confidence: (0.5 + index * 0.02).toFixed(2),
    }));
    setSupportAndConfidence(newSupportAndConfidence);
  };
  

  const handleInputChange = (index, type, value) => {
    const newSupportAndConfidence = [...supportAndConfidence];
    newSupportAndConfidence[index] = { ...newSupportAndConfidence[index], [type]: value };
    setSupportAndConfidence(newSupportAndConfidence);
  };

  return (
    <div className='flex flex-col h-auto border border-gray-300 shadow-md bg-white p-10 pl-12 pr-12 w-full mb-3.5 rounded-lg'>
      <h1>Association Rule Mining</h1>
      <div>
        <label>Count of Support and Confidence:</label>
        <input
          type="number"
          value={countOfSupportAndConfidence}
          onChange={handleCountChange}
        />
      </div>
      {[...Array(countOfSupportAndConfidence)].map((_, index) => (
        <div key={index} className="input-row">
          <label>{`Support Value ${index + 1}:`}</label>
          <input
            type="number"
            step="0.01"
            value={supportAndConfidence[index].support}
            onChange={(e) => handleInputChange(index, 'support', e.target.value)}
          />
          <label>{`Confidence Value ${index + 1}:`}</label>
          <input
            type="number"
            step="0.01"
            value={supportAndConfidence[index].confidence}
            onChange={(e) => handleInputChange(index, 'confidence', e.target.value)}
          />
        </div>
      ))}
      <button onClick={runAssociationRules}>Run Association Rules</button>

      {results.length > 0 && (
        <div>
          <h2>Results:</h2>
          <table>
            <thead>
              <tr>
                <th>Support</th>
                <th>Confidence</th>
                <th>Total Rules</th>
                <th>Frequent Itemsets</th>
                <th>Rules</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.support}</td>
                  <td>{result.confidence}</td>
                  <td>{result.total_rules}</td>
                  <td>
                  <ul>
                    {result.frequent_itemsets.slice(0, 5).map((itemset, itemsetIndex) => (
                      <li key={itemsetIndex}>{itemset}</li>
                    ))}
                  </ul>

                  </td>
                  <td>
                    <ul>
                      {Object.entries(result.rules).map(([key, value], ruleIndex) => (
                        <li key={ruleIndex}>
                          <strong>{key}:</strong> {value}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {error && (
        <div>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default Task1;
