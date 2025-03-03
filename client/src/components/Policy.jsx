




import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import '../styles/Policy.css';

const Policy = ({ user }) => {
  const [policies, setPolicies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await api.get('/employee/policies');
        setPolicies(response.data);
      } catch (error) {
        console.error('Error fetching policies:', error);
        setError('Failed to fetch policies. Please try again.');
      }
    };
    fetchPolicies();
  }, []);

  return (
    <div className="policy-container">
      <h2 className="policy-title">Company Policies</h2>
      {error && <div className="error-message">{error}</div>}
      {policies.length === 0 ? (
        <p className="no-records">No policies found.</p>
      ) : (
        <ul className="policy-list">
          {policies.map((policy) => (
            <li key={policy._id} className="policy-item">
              <strong>{policy.title}</strong>: {policy.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Policy;