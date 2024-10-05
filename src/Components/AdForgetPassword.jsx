import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Signup.css";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";

const AdForgetPassword = () => {
 
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);    
    axios
      .post("https://coffee-web-backend.vercel.app/admin/adminforgotpassword", values)
      .then((res) => {        
        Swal.fire({
          icon: "success",
          title: "Email Sent",
          text: "We've sent you a password reset link to your email address.",
        });
        resetForm();
        navigate("/admin/login");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to send email",
        });
        setSubmitting(false);
      });
  };

  return (
    <div className="container forgot-password-container">
      <div className="row justify-content-center">
        <div className="col-md-6 forgot-password-box">
          <h2 className="text-center">Forgot Password</h2>
          <Formik initialValues={{ email: "" }} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <Field
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </button>
              </Form>
            )}
          </Formik>
          <div className="mt-3">
            Remember your password?{" "}
            <Link to="/login" style={{ fontWeight: "bold" }}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdForgetPassword;
