import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>Welcome my App</h1>
      <p>Yay it works.</p>
      <button className="landing-button" onClick={() => navigate('/login')}>
        Logout
      </button>
    </div>
  );
}

export default LandingPage;
