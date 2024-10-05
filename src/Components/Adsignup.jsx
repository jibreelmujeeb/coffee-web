import React, { useState } from 'react'
import logo from '../assets/images/coffee-beans.png'
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const AdSignup = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/admin/signup', formData).then((result)=>{
        console.log(result);
        if(result.data.status){
            Swal.fire({
                icon: "success",
                title: "Good job!",
                text: result.data.msg,
                footer: ``,
              });

              navigate('/admin/login')
        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: result.data.msg,
                footer: ``,
              });
        }
    }).catch((error) => {  
        
    });
  };

  return (
    <div>
      <section className="" style={{ backgroundColor: "#9A616D" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                      alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem" }} />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">

                      <form onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <img src={logo} alt="" style={{ width: "40px" }} />
                          <span className="h1 fw-bold mb-0">Jibreel Cafe</span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign Up Now</h5>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form-control form-control-lg"
                            required
                          />
                          <label className="form-label">Email address</label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="form-control form-control-lg"
                            required
                          />
                          <label className="form-label">Username</label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="form-control form-control-lg"
                            required
                          />
                          <label className="form-label">Password</label>
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                          >
                            Sign Up
                          </button>
                        </div>

                        <a className="small text-muted" href="#!">Forgot password?</a>
                        <br />
                        <span>Have an account?</span>
                        <a href="/admin/login" style={{ color: "#393f81" }}>Login here</a>

                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdSignup;
