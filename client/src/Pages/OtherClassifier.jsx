import React, { useState } from 'react';
import axios from 'axios';

function OtherClassifier() {
  const [selectedClassifier, setSelectedClassifier] = useState('');
  const [selectedDataset, setSelectedDataset] = useState('');
  const [results, setResults] = useState(null);

  const handleClassifierChange = (event) => {
    setSelectedClassifier(event.target.value);
  };

  const handleDatasetChange = (event) => {
    setSelectedDataset(event.target.value);
  };

//   const handleSubmit = async () => {
//     try {
//         // Make an API request to your backend with selectedClassifier and selectedDataset
//         const response = await axios.post('/api/your-endpoint', {
//           classifier: selectedClassifier,
//           dataset: selectedDataset,
//         });
  
//         // Once you have the response, you can set the results in state using setResults
//         setResults(response.data);
//       } catch (error) {
//         // Handle any errors here, e.g., display an error message to the user
//         console.error('API request failed:', error);
//       }
//     const exampleResponse = {
//       confusionMatrix: [
//         [50, 5],
//         [10, 85],
//       ],
//       accuracy: 0.9,
//       misclassificationRate: 0.1,
//       sensitivity: 0.89,
//       specificity: 0.91,
//       precision: 0.91,
//       recall: 0.89,
//     };

//     setResults(exampleResponse);
//   };

// const handleSubmit = async () => {
//     if (!selectedClassifier || !selectedDataset) {
//       return; // Prevent making the request if classifier or dataset is not selected
//     }
  
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/${selectedClassifier.toLowerCase()}/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ dataset: selectedDataset }),
//       });
//       console.log(typeof(selectedDataset))
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
  
//       const responseData = await response.json();
//       console.log(responseData,response)
//       setResults(responseData);
//     } catch (error) {
//       console.error('Error:', error);
//       // Handle error state or display an error message to the user
//     }
//   };

const handleSubmit = async () => {
    if (!selectedClassifier || !selectedDataset) {
      return; // Prevent making the request if classifier or dataset is not selected
    }
  
    try {
      const response = await axios.post(`http://127.0.0.1:8000/${selectedClassifier.toLowerCase()}/`, {
        dataset: selectedDataset,
      });
  
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = response.data;
      setResults(responseData);
    } catch (error) {
      console.error('Error:', error);
      // Handle error state or display an error message to the user
    }
  };
  
  

  return (
    <div className="flex flex-col h-auto border border-gray-300 shadow-md bg-white p-10 pl-12 pr-12 w-full mb-3.5 rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Classifier Dashboard</h1>
      <div className="mb-4">
        <label htmlFor="classifier" className="block font-semibold">
          Select Classifier:
        </label>
        <select
          id="classifier"
          className="w-full border p-2 rounded"
          onChange={handleClassifierChange}
          value={selectedClassifier}
        >
          <option value="">Select Classifier</option>
          <option value="regression">Regression Classifier</option>
          <option value="naive_bayesian">Naïve Bayesian Classifier</option>
          <option value="knn">k-NN Classifier</option>
          <option value="ann">Three-layer ANN Classifier</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="dataset" className="block font-semibold">
          Select Dataset:
        </label>
        <select
          id="dataset"
          className="w-full border p-2 rounded"
          onChange={handleDatasetChange}
          value={selectedDataset}
        >
          <option value="BreastCancer">Select Dataset</option>
          <option value="IRIS">IRIS Dataset</option>
          <option value="BreastCancer">Breast Cancer Dataset</option>
        </select>
      </div>
      <button
        className="bg-white-500 text-black px-4 py-2 rounded hover:bg-black-600 text-black"
        onClick={handleSubmit}
        disabled={!selectedClassifier || !selectedDataset}
      >
        Submit
      </button>
      {results && (
    <div className="mt-4">
    <h2 className="text-lg font-semibold mb-2">Results:</h2>
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Metrics</th>
            <th>Values</th>
          </tr>
        </thead>
        <tbody>
          {selectedClassifier === 'regression' ? (
            <>
              <tr>
                <td>Mean Absolute Error (MAE)</td>
                <td>{results.mae}</td>
              </tr>
              <tr>
                <td>Mean Squared Error (MSE)</td>
                <td>{results.mse}</td>
              </tr>
              <tr>
                <td>R-squared (R2)</td>
                <td>{results.r2}</td>
              </tr>
            </>
          ) : (
            <>
              <tr>
                <td>Confusion Matrix</td>
                <td>
                  <table className="table table-bordered">
                    <tbody>
                      {results.confusionMatrix.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((value, colIndex) => (
                            <td key={colIndex}>{value}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>Accuracy</td>
                <td>{results.accuracy}</td>
              </tr>
              <tr>
                <td>Misclassification Rate</td>
                <td>{results.misclassificationRate}</td>
              </tr>
              <tr>
                <td>Sensitivity</td>
                <td>{results.sensitivity}</td>
              </tr>
              <tr>
                <td>Specificity</td>
                <td>{results.specificity}</td>
              </tr>
              <tr>
                <td>Precision</td>
                <td>{results.precision}</td>
              </tr>
              <tr>
                <td>Recall</td>
                <td>{results.recall}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  </div>
      )}
    </div>
  );
}

export default OtherClassifier;
