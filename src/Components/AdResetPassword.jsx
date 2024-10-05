import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import "./Signup.css";

const AdResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [tokenValid, setTokenValid] = useState(true);
  const [email, setemail] = useState('')

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/admin/verify-token?token=${token}`);        
          setTokenValid(true);
          console.log(response.data);
          
          setemail(response.data.details.email);
      } catch {
        setTokenValid(false);
      }
    };

    verifyToken();
  }, [token]);

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm your password"),
  });

  const handleAdResetPassword = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/admin/changepassword`,
        {
          newPassword: values.newPassword,
          email
        }
      );
      if (response.data.status) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.msg,
        });
        resetForm();
        navigate("/admin/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.msg,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: error.response?.data?.msg || "Failed to reset password",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container reset-password-container">
      <div className="row justify-content-center">
        <div className="col-md-6 reset-password-box">
          <h2 className="text-center">Reset Password</h2>
          <Formik
            initialValues={{ newPassword: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={handleAdResetPassword}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">
                    New Password
                  </label>
                  <Field
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Resetting..." : "Reset Password"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AdResetPassword;
