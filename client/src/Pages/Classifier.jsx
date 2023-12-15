// src/Classifier.js

import React, { useState } from 'react';
import axios from 'axios';
// import decisionTreeImage from '../../../media/decision_tree.png';
import tree from '../../src/decision_tree.png'
import DecisionTreeTable from '../Components/DecisionTreeTable';


// import a from '/Users/krishnacharanbhola/Desktop/MAMBA/sem7/DM/assign1/mysite/media/decision_tree.png'
function Classifier() {
  const [selectedMethod, setSelectedMethod] = useState('info_gain');
  const [file, setFile] = useState(null);
  const [targetColumn, setTargetColumn] = useState('');
  const [results, setResults] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [rules, setRules] = useState('');

  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value);
  };
  

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTargetColumnChange = (event) => {
    setTargetColumn(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('target_column', targetColumn);

      const response = await axios.post(`http://127.0.0.1:8000/classify/${selectedMethod}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResults(response.data);
      
      setRules(response.data.rules)
      console.log(rules)
      setImageURL(response?.data.image_url);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col h-auto border border-gray-300 shadow-md bg-white p-10 pl-12 pr-12 w-full mb-3.5 rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Decision Tree Classifier</h1>
      <label className="block mb-2">
        Select Method:
        <select
          value={selectedMethod}
          onChange={handleMethodChange}
          className="w-full border rounded py-2 px-3"
        >
          <option value="info_gain">Information Gain</option>
          <option value="gain_ratio">Gain Ratio</option>
          <option value="gini">Gini Index</option>
        </select>
      </label>
      <br />
      <label className="block mb-2">
        Upload Dataset:
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="w-full border rounded py-2 px-3"
        />
      </label>
      <br />
      <label className="block mb-2">
        Target Column:
        <input
          type="text"
          value={targetColumn}
          onChange={handleTargetColumnChange}
          className="w-full border rounded py-2 px-3"
        />
      </label>
      <br />
      <button
        onClick={handleSubmit}
        className="bg-white-500 text-black px-4 py-2 rounded hover:bg-black-600 text-black"
      >
        Submit
      </button>
      {results && (
            <div className="result-container mt-4">
            <h2 className="text-lg font-semibold mb-2">Classification Results:</h2>
            <div className="result-content bg-gray-100 p-4 rounded overflow-x-auto">
              <table className="w-full">
                <tbody>
                  {Object.entries(results).map(([key, value]) => (
                    <tr key={key}>
                      <td className="font-bold">{key.replace(/_/g, ' ')}</td>
                      <td>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      )}

      {imageURL && (
        <div>
          <h2>Decision Tree:</h2>
          <img src={tree} alt="Decision Tree" />
        </div>
      )}
      <DecisionTreeTable text={rules}/>
    </div>
  );
}

export default Classifier;
