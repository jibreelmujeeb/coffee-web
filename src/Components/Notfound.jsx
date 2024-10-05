import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="container not-found-container">
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/home" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
