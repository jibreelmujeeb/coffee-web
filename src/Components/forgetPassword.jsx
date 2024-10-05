import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Signup.css';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const handleForgotPassword = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('http://localhost:3000/forgot-password', values);
      if (response.data.status) {
        Swal.fire({
          icon: "success",
          title: "Email Sent",
          text: response.data.msg,
        });
        resetForm();
        navigate('/login');
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.msg,
        });
      }
    } catch (error) {
      console.error('Error:', error.response);
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: error.response?.data?.msg || 'Failed to send reset email',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container forgot-password-container">
      <div className="row justify-content-center">
        <div className="col-md-6 forgot-password-box">
          <h2 className="text-center">Forgot Password</h2>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={handleForgotPassword}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <Field type="email" className="form-control" id="email" name="email" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </button>
              </Form>
            )}
          </Formik>
          <div className="mt-3">
            Remember your password? <Link to="/login" style={{ fontWeight: 'bold' }}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
