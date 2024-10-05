import React from 'react'
import img1 from '../assets/images/coffee-beans.png'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
  return (
    <nav className="navbar navbar-expand-lg">
            <div className="container">
              <a className="navbar-brand d-flex align-items-center" href="/home">
                <img src={img1} className="navbar-brand-image img-fluid" alt="Barista Cafe Template" />
                Jibreel
              </a>
    
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
    
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-lg-auto">
                  <li className="nav-item">
                    <a className="nav-link smoothscroll" href="/home">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link smoothscroll" href="#section_2">About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link smoothscroll" href="#section_3">Our Menu</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link smoothscroll" href="#section_4">Reviews</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link smoothscroll" href="#section_5">Contact</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link smoothscroll" href="/history">History</a>
                  </li>
                  <li className="nav-item" onClick={()=>{
                    localStorage.removeItem('user'), 
                    !localStorage.user?navigate('/login'):null
                    }}>
                    <a className="nav-link smoothscroll" ><i className="bi bi-box-arrow-left"></i></a>
                  </li>
                </ul>
    
                <div className="ms-lg-3 col-3">
                  <button className="btn custom-btn custom-border-btn w-100" onClick={()=>{navigate('/reserve')}}>
                    Reservation
                    <i className="bi-arrow-up-right ms-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </nav>
  )
}

export default Navbar