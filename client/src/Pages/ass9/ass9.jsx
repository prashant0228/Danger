// src/PredictDisease.js
import React, { useState } from 'react';
import axios from 'axios';

const PredictDisease = () => {
  const [symptom, setSymptom] = useState('');
  const [prediction, setPrediction] = useState('');

  const handlePrediction = async () => {
    try {
      const response = await axios.post('http://localhost:8000/predict/', {
        symptom: symptom,
      });

      setPrediction(response.data.disease);
    } catch (error) {
      console.error('Error predicting disease:', error);
    }
  };

  return (
    <div>
      <label>
        Enter Symptom:
        <input type="text" value={symptom} onChange={(e) => setSymptom(e.target.value)} />
      </label>
      <button onClick={handlePrediction}>Predict Disease</button>
      {prediction && <p>Predicted Disease: {prediction}</p>}
    </div>
  );
};

export default PredictDisease;
