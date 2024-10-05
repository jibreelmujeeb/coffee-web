import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";

const BookingHistory = () => {
  const [allBooking, setallBooking] = useState([]);
  const [first, setfirst] = useState(JSON.parse(localStorage.getItem("user")));
  const getbooking = () => {
    axios
      .post("http://localhost:3000/getbooking", { email: first?.email })
      .then((response) => {
        console.log(response.data);
        setallBooking(response.data.bookings);
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    getbooking();
  }, []);

  const deleteBooking = (booking) => {
    axios.delete(`http://localhost:3000/deletebooking?id=${booking}`)
     .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          Swal.fire({
            icon: "success",
            title: "Good job",
            text: response.data.msg,
          });
          getbooking();
        }else{
          Swal.fire({
            icon: "error",
            title: "Oops",
            text: response.data.msg,
          });
        }
      })
     .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <Navbar />

      <h5 className="px-2">Welcome {first?.fulllname}, {allBooking.length} booking found</h5>

      {allBooking.length > 0 ? (
        <table className="table table-stripped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Time</th>
              <th scope="col">Date</th>
              <th scope="col">People</th>
              <th scope="col">Delivered</th>
              <th scope="col">Booking Type</th>
              <th scope="col">Comment</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {allBooking.map((booking, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{booking.time}</td>
                <td>{booking.date}</td>
                <td>{booking.numberOfPeople}</td>
                <td>{booking.delivered? "Delivered": "Not delivered"}</td>
                <td>{booking.bookingType}</td>
                <td>{booking.comment}</td>
                <td>
                  <button className="btn btn-danger " onClick={()=>{deleteBooking(booking._id)}}>
                    {booking.delivered?"Delete order":"Cancel order"}
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="bg-light p-5 rounded text-center col-11 mx-auto shadow-sm">
          <h6>You have no booking</h6>
        </div>
      )}
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
                  Itan olu tech sollution
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BookingHistory;
