import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AdminToken = () => {
  const { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const adminToken = localStorage.getItem('admin_token');

      if (!adminToken ) {
        setVerificationStatus(false);
        setErrorMessage('No token found');
        navigate('/admin/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/admin/token', {
          headers: {
            'Authorization': `Bearer ${adminToken}`, 
            'userid':token
          },
        })
        .then((result)=>{
            console.log(result.data);
            if(result.data.status){
                navigate('/admin/dashboard'); 
            }else{
                navigate('/admin/login'); 
                localStorage.removeItem('admin_token'); 
            }
            
        })

        setVerificationStatus(true); 
      } catch (error) {
        setVerificationStatus(false);
        if (error.response) {
          setErrorMessage(error.response.data.msg || 'Token verification failed');
        } else {
          setErrorMessage('Error verifying token');
        }
      }
    };

    verifyToken();
  }, [navigate]);

  return (
    <div>
      {verificationStatus === null && <p>Verifying token...</p>}
      {verificationStatus && <p>Token is valid!</p>}
      {verificationStatus === false && <p>{errorMessage}</p>}
    </div>
  );
};

export default AdminToken;
