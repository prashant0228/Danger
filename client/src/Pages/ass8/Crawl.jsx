// Crawl.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './crawl.css';

const Crawl = () => {
  const [url, setUrl] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [bfsResult, setBfsResult] = useState([]);
  const [dfsResult, setDfsResult] = useState([]);

  const handleCrawl = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/crawl/', { url: url });
      setBfsResult(response.data.bfs_result);
      setDfsResult(response.data.dfs_result);
      setShowResults(true);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        className="input-field m-2 p-2 border border-gray-300 "
      />
      <button onClick={handleCrawl} className="bg-white-500 text-black px-4 py-2 rounded hover:bg-black-600 text-black">
        Crawl URLs
      </button>

      {showResults && (
        <div className="results-container mt-4">
          <h2 className="result-heading text-xl font-bold">BFS Results:</h2>
          <ul className="result-list">
            {bfsResult.map((link, index) => (
              <li key={index} className="result-item">{link}</li>
            ))}
          </ul>

          <h2 className="result-heading text-xl font-bold mt-4">DFS Results:</h2>
          <ul className="result-list">
            {dfsResult.map((link, index) => (
              <li key={index} className="result-item">{link}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Crawl;
