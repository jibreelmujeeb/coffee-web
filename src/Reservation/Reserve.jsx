import React, { useEffect, useState } from 'react';
import '../Home/Home.css';
import reserve1 from '../assets/images/barman-with-fruits.jpg';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
const Reserve = () => {

const navigate = useNavigate()
  // Set up state for each input field
  const [NoUser, setNoUser] = useState(false)
  useEffect(()=>{
    if(!localStorage.user){
        setNoUser(true)
        navigate('/login')
    }
  })
  const [first, setfirst] = useState(JSON.parse(localStorage.getItem('user')))
  const [formData, setFormData] = useState({
    email: first?.email,
    phone: '',
    time: '18:30',
    date: '',
    bookingType: '',
    numberOfPeople: '',
    comment: '',
    amount: 0,
    Price:0
    
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Log form data
        axios.post('http://localhost:3000/booking', {...formData, amount: 10000*formData.amount}).then((response)=>{

            if(response.data.status){
                window.location.href = response.data.authorization_url
                Swal.fire({
                    icon: "success",
                    title: "Good job",
                    text: response.data.msg,
                  });
            }
            
        }).catch((Err)=>{
      
        })
  };

  return (
    <div>
      <div className="reservation-page">
        <main>
          <Navbar/>
          <section className="">
            <div className="" />
            <div className="p-0">
              <div className="col-lg-11 mx-auto">
                <div className="booking-form-wrap mt-0">
                  <div className="row">
                    <div className="col-lg-7 col-12 p-0">
                      <form className="custom-form booking-form" onSubmit={handleSubmit}>
                        <div className="text-center mb-4 pb-lg-2">
                          <em className="text-white">Fill out the booking form</em>
                          <h2 className="text-white">Book a table</h2>
                        </div>
                        <div className="booking-form-body">
                          <div className="row">
                            <div className="col-lg-6 col-12">
                              <input type="text" name="email" className="form-control border-0" placeholder="Full Name" required value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="col-lg-6 col-12">
                              <input type="tel" name="phone" className="form-control" placeholder="Phone: 085 456 7890" required value={formData.phone} onChange={handleChange} />
                            </div>
                            <div className="col-lg-6 col-12">
                              <input type="time" name="time" className="form-control" value={formData.time} onChange={handleChange} />
                            </div>
                            <div className="col-lg-6 col-12">
                              <input type="date" name="date" className="form-control" required value={formData.date} onChange={handleChange} />
                            </div>
                            <div className="col-lg-6 col-12">
                              <input type="number" name="amount" className="form-control" placeholder='Quantity' value={formData.amount} onChange={handleChange} />
                            </div>
                            <div className="col-lg-6 col-12">
                              <select name="bookingType" className='w-100 border bg-transparent' style={{ height: "40px" }} value={formData.bookingType} onChange={handleChange}>
                                <option value="" disabled>Booking type</option>
                                <option value="Pick it up">Pick it up</option>
                                <option value="Delivery by company">Delivery by company</option>
                              </select>
                            </div>
            
                            <div className="col-lg-12 col-12 mt-4">
                              <input type="number" name="numberOfPeople" className="form-control" placeholder="Number of People" required value={formData.numberOfPeople} onChange={handleChange} />
                              <textarea name="comment" rows="3" className="form-control" placeholder="what you want and Your Address" value={formData.comment} onChange={handleChange}></textarea>
                            </div>
                            <div className="col-lg-4 col-md-10 col-8 mx-auto mt-2">
                              <button type="submit" className="form-control">Submit</button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col-lg-5 col-12 p-0">
                      <div className="booking-form-image-wrap">
                        <img src={reserve1} className="booking-form-image img-fluid" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-12 me-auto">
              <em className="text-white d-block mb-4">Where to find us?</em>

              <strong className="text-white">
                <i className="bi-geo-alt me-2"></i>
                Jibreel Coffee Shop, 1234 Main St, Ogbomoso, Nigeria
              </strong>

              <ul className="social-icon mt-4">
                <li className="social-icon-item">
                  <a href="#" className="social-icon-link bi-facebook"></a>
                </li>

                <li className="social-icon-item">
                  <a
                    href="https://x.com/minthu"
                    target="_new"
                    className="social-icon-link bi-twitter"
                  ></a>
                </li>

                <li className="social-icon-item">
                  <a href="#" className="social-icon-link bi-whatsapp"></a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-12 mt-4 mb-3 mt-lg-0 mb-lg-0">
              <em className="text-white d-block mb-4">Contact</em>

              <p className="d-flex mb-1">
                <strong className="me-2">Phone:</strong>
                <a href="tel: 305-240-9671" className="site-footer-link">
                  (+234) 708 5099 216
                </a>
              </p>

              <p className="d-flex">
                <strong className="me-2">Email:</strong>

                <a href="mailto:infogmail.com" className="site-footer-link">
                  Jibreelmujeeb@gmail.com
                </a>
              </p>
            </div>

            <div className="col-lg-5 col-12">
              <em className="text-white d-block mb-4">Opening Hours.</em>

              <ul className="opening-hours-list">
                <li className="d-flex">
                  Monday - Friday
                  <span className="underline"></span>
                  <strong>9:00 - 18:00</strong>
                </li>

                <li className="d-flex">
                  Saturday
                  <span className="underline"></span>
                  <strong>11:00 - 16:30</strong>
                </li>

                <li className="d-flex">
                  Sunday
                  <span className="underline"></span>
                  <strong>Closed</strong>
                </li>
              </ul>
            </div>

            <div className="col-lg-8 col-12 mt-4">
              <p className="copyright-text mb-0">
                Copyright © Jibreel Cafe 2024 - Design:{" "}
                <a
                  rel="sponsored"
                  href="https://www.tooplate.com"
                  target="_blank"
                >
                  Itan olu tech solution
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
        </main>
      </div>
    </div>
  );
};

export default Reserve;
