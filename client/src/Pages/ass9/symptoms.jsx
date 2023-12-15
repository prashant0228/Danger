// src/components/Symptoms.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Symptoms() {
  const [symptoms, setSymptoms] = useState([]);

  useEffect(() => {
    // Fetch symptoms from the Django API
    axios.get('http://localhost:8000/api/symptoms/')  // Update the URL with your Django server URL
      .then(response => setSymptoms(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Symptoms</h1>
      <ul>
        {symptoms.map(symptom => (
          <li key={symptom.id}>{symptom.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Symptoms;
