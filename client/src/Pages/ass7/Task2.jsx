// Task1.js
import React, { useState } from 'react';
import axios from 'axios';

function Task2() {
    const [interestingRules, setInterestingRules] = useState([]);
    const [error, setError] = useState(null);

    const runAssociationRules = async () => {
        try {
            // Send a POST request to the Django backend
            const response = await axios.post('http://localhost:8000/run_association_rules/', {
                // Include any necessary request parameters
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Update the state with the received data
            setInterestingRules(response.data.interesting_rules);
            setError(null);  // Clear any previous errors
        } catch (error) {
            console.error('Error:', error.response?.data?.error || 'Unknown error');
            setError('Error occurred while fetching results');
        }
    };

    return (
        <div>
            <h1>Association Rule Mining</h1>
            <h2>aaaaaaaaa</h2>
            <h2>aaaaaaaaa</h2>
            <button onClick={runAssociationRules}>Run Association Rules</button>
            
            {interestingRules.length > 0 && (
                <div>
                    <h2>Interesting Rules:</h2>
                    <ul>
                        {interestingRules.map((rule, index) => (
                            <li key={index}>{JSON.stringify(rule)}</li>
                        ))}
                    </ul>
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

export default Task2;
