import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css'; 

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <div className="error-box">
        <h1>Oops!</h1>
        <h2>Invalid Login Attempt</h2>
        <p>It seems like the credentials you entered are incorrect.</p>
        <p>Or You Have Poor Internet Connection</p>
        <button className="btn btn-primary" onClick={() => navigate('/login')}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
