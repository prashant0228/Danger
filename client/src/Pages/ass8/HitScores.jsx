// HitScores.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './hitscore.css'; // Import the CSS file

const HitScores = () => {
  const [topAuthorityPages, setTopAuthorityPages] = useState([]);
  const [topHubPages, setTopHubPages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorityResponse = await axios.get('http://127.0.0.1:8000/hitscore');
        const hubResponse = await axios.get('http://127.0.0.1:8000/hitscore');

        setTopAuthorityPages(authorityResponse.data.top_authority_pages);
        setTopHubPages(hubResponse.data.top_hub_pages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="heading">Top Authority Pages</h1>
        <div className="grid">
          {topAuthorityPages.map((page, index) => (
            <div key={index} className="card">
              <p>Page: {page.Page}</p>
              <p>Authority Score: {page.AuthorityScore}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1 className="heading">Top Hub Pages</h1>
        <div className="grid">
          {topHubPages.map((page, index) => (
            <div key={index} className="card">
              <p>Page: {page.Page}</p>
              <p>Hub Score: {page.HubScore}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HitScores;
