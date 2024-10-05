import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import Swal from "sweetalert2";
import axios from "axios";
const SignupForm = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    fullname: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <div className="container signup-container">
      <div className="row justify-content-center">
        <div className="col-md-6 signup-box">
          <h2 className="text-center">Sign Up</h2>
          <Formik
            initialValues={{ fullname: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);

              axios
                .post("http://localhost:3000/signup", values)
                .then((response) => {
                  console.log(response);
                  if (response.data.status==true) {
                    Swal.fire({
                      icon: "success",
                      title: 'Good job',
                      text: response.data.msg,
                    });
                    navigate("/login");
                  }
                  else{
                    Swal.fire({
                      icon: "error",
                      title: 'Oops!',
                      text: response.data.msg,
                      footer: `<a href="/login">Navigate To Login Page?</a>`,
                    });
                  }
                })
                .catch((error) => {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                    footer: ``,
                  });
                });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="fullname"
                    name="fullname"
                    placeholder="Enter your full name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <Field
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <Field
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Sign Up
                </button>
                 
              </Form>
            )}
          </Formik>
        
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
