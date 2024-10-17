import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Signup.css';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const handleLogin = (values) => {
        console.log(values);
        
        axios.post('http://localhost:3000/login', values).then((response) => {
            if (response.data.status) {
                Swal.fire({
                    icon: "success",
                    title: "Login Successfully",
                    text: response.data.msg,
                });
                let obj = { fulllname: response.data.user.fullname, email: response.data.user.email };
                localStorage.setItem('user', JSON.stringify(obj));
                navigate('/home');
            }
        })
        .catch(error => {
            if (error.status === 401) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: 'Incorrect details...',
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: 'Something went wrong',
                });
            }
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle password visibility
    };

    return (
        <div className="container login-container">
            <div className="row justify-content-center">
                <div className="col-md-6 login-box">
                    <h2 className="text-center">Login</h2>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleLogin}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <Field type="email" className="form-control" id="email" name="email" />
                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <div className="input-group">
                                        <Field type={showPassword ? 'text' : 'password'} className="form-control" id="password" name="password" />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                    <ErrorMessage name="password" component="div" className="text-danger" />
                                </div>
                                <Link to='/forgot-password'>
                                    <div className="forgot" style={{ padding: "3px", marginLeft: "0%", cursor: "pointer", marginTop: "-10px" }}>
                                        Forgot Password?
                                    </div>
                                </Link>
                                <button type="submit" className="btn btn-primary w-100">
                                    Login
                                </button>
                            </Form>
                        )}
                    </Formik>
                    Does not have an account? <a href="/signup" style={{ fontWeight: "bold" }}>Signup</a>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
