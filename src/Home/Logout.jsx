import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Home = () => {
  const navigate = useNavigate();


  const storedUser = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    Swal.fire({
      icon: 'success',
      title: 'Logged Out Successfully',
      text: 'You have been logged out.',
    });
    navigate('/login'); 
  };

  return (
    <div className="container home-container">
      <h2>Welcome, {storedUser ? storedUser.name : 'Guest'}!</h2>
      {storedUser ? (
        <div>
          <p>Email: {storedUser.email}</p>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <p>Please log in to access your account.</p>
      )}
    </div>
  );
};

export default Home;
