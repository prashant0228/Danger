// src/components/Diseases.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Diseases() {
  const [diseases, setDiseases] = useState([]);


  useEffect(() => {
    // Fetch diseases from the Django API
    axios.get('http://localhost:8000/api/diseases/')  // Update the URL with your Django server URL
      .then(response => setDiseases(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Diseases</h1>
      <ul>
        {diseases.map(disease => (
          <li key={disease.id}>{disease.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Diseases;
