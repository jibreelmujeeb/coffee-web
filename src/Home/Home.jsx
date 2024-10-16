import "../Home/Home.css";
import img2 from "../assets/images/team/portrait-elegant-old-man-wearing-suit.jpg";
import img3 from "../assets/images/team/cute-korean-barista-girl-pouring-coffee-prepare-filter-batch-brew-pour-working-cafe.jpg";
import img4 from "../assets/images/team/small-business-owner-drinking-coffee.jpg";
import img5 from "../assets/images/team/smiley-business-woman-working-cashier.jpg";
import img6 from "../assets/images/reviews/young-woman-with-round-glasses-yellow-sweater.jpg";
import img7 from "../assets/images/reviews/senior-man-white-sweater-eyeglasses.jpg";
import img8 from "../assets/images/reviews/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair.jpg";
import videoSrc from "../assets/images/pexels-mike-jones-9046237.mp4";
import React, { useState, useEffect, useRef } from "react";
import Loader from "../Components/Loader";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [user, setuser] = useState(JSON.parse(localStorage.getItem('user')))
  const form = useRef();
  useEffect(() => {
    if (!localStorage.user) {
      navigate("/login");
    }
    setTimeout(() => {
      setData({ name: "Cafe Klang" });
      setLoading(false);
    }, 10000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  const contactUs = () => {
    const serviceID = "service_pn8r8u5";
    const templateID = "template_tpmhbo9";
    const userID = "your_user_id";

    emailjs
      .send(serviceID, templateID, formData, userID)
      .then((response) => {
        alert("Email sent successfully!");
      })
      .catch((err) => {
        alert("Failed to send email. Please try again.");
      });
  };


  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_40exjej", "template_tpmhbo9", form.current, {
        publicKey: "FLvMqXi8ztP48XvVb",
      })
      .then(
        () => {
          Swal.fire({
            icon: "success",
            title: "Good job",
            text: "Email sent successfully",
          });
        },
        (error) => {
          console.log("FAILED...", error.text);
          Swal.fire({
            icon: "success",
            title: "Cannot send email",
            text: error.text,
          });
        }
      );
  };

  return (
    <div>
      <Navbar />
      <section
        className="hero-section d-flex justify-content-center align-items-center"
        id="section_1"
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-12 mx-auto">
              <em className="small-text">welcome to Jibreel.co</em>

              <h1>Cafe Klang</h1>

              <p className="text-white mb-4 pb-lg-2">
                your <em>favourite</em> coffee daily lives.
              </p>

              <a
                className="btn custom-btn story-btn custom-border-btn smoothscroll me-3"
                href="#section_2"
              >
                Our Story
              </a>

              <a
                className="btn check-btn custom-btn smoothscroll me-2 mb-2"
                href="#section_3"
              >
                <strong>Check Menu</strong>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-slides"></div>
      </section>

      <section className="about-section section-padding" id="section_2">
        <div className="section-overlay"></div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-12">
              <div className="ratio ratio-1x1">
                <video autoPlay loop muted className="custom-video" poster="">
                  <source src={videoSrc} />
                  Your browser does not support the video tag.
                </video>

                <div className="about-video-info d-flex flex-column">
                  <h4 className="mt-auto">We Started Since 2024.</h4>

                  <h4>Best Cafe in OGB.</h4>
                </div>
              </div>
            </div>

            <div className="col-lg-5 col-12 mt-4 mt-lg-0 mx-auto">
              <em className="text-white">Jibreel.co</em>

              <h2 className="text-white mb-3">Cafe OGB</h2>

              <p className="text-white">
                The café had been in the town for as long as anyone could
                remember, and it had become a beloved institution among the
                locals.
              </p>

              <p className="text-white">
                The café was run by a friendly and hospitable man, Mr Jibreel.
                At Jibreel Cafe, we take pride in serving freshly brewed coffee
                sourced from the finest beans, along with a selection of
                specialty teas to suit every palate. Pair your drink with our
                delicious pastries, artisanal sandwiches, or flavorful breakfast
                options that cater to all tastes. Whether you’re here to start
                your day with a hearty breakfast, enjoy a leisurely brunch, or
                unwind with a cup of coffee in the afternoon, we have something
                for everyone. Our cozy seating, warm ambiance, and free Wi-Fi
                create an ideal setting for relaxation and inspiration.
                <a
                  rel="nofollow"
                  href="https://www.tooplate.com"
                  target="_blank"
                ></a>
              </p>

              <a
                href="#barista-team"
                className="smoothscroll btn custom-btn custom-border-btn mt-3 mb-4 meet"
              >
                Meet Jibreels
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        className="barista-section section-padding section-bg"
        id="barista-team"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-12 text-center mb-4 pb-lg-2">
              <em className="text-white">Creative Jibreels</em>

              <h2 className="text-white">Meet People</h2>
            </div>

            <div className="col-lg-3 col-md-6 col-12 mb-4">
              <div className="team-block-wrap">
                <div className="team-block-info d-flex flex-column">
                  <div className="d-flex mt-auto mb-3">
                    <h4 className="text-white mb-0">Steve</h4>

                    <p className="badge ms-4">
                      <em>Boss</em>
                    </p>
                  </div>

                  <p className="text-white mb-0">
                    your favourite coffee daily lives tempor.
                  </p>
                </div>

                <div className="team-block-image-wrap">
                  <img
                    src={img2}
                    className="team-block-image img-fluid"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12 mb-4">
              <div className="team-block-wrap">
                <div className="team-block-info d-flex flex-column">
                  <div className="d-flex mt-auto mb-3">
                    <h4 className="text-white mb-0">Sandra</h4>

                    <p className="badge ms-4">
                      <em>Manager</em>
                    </p>
                  </div>

                  <p className="text-white mb-0">
                    your favourite coffee daily lives.
                  </p>
                </div>

                <div className="team-block-image-wrap">
                  <img
                    src={img3}
                    className="team-block-image img-fluid"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12 mb-4">
              <div className="team-block-wrap">
                <div className="team-block-info d-flex flex-column">
                  <div className="d-flex mt-auto mb-3">
                    <h4 className="text-white mb-0">Jackson</h4>

                    <p className="badge ms-4">
                      <em>staff</em>
                    </p>
                  </div>

                  <p className="text-white mb-0">
                    your favourite coffee daily lives.
                  </p>
                </div>

                <div className="team-block-image-wrap">
                  <img
                    src={img4}
                    className="team-block-image img-fluid"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12">
              <div className="team-block-wrap">
                <div className="team-block-info d-flex flex-column">
                  <div className="d-flex mt-auto mb-3">
                    <h4 className="text-white mb-0">Michelle</h4>

                    <p className="badge ms-4">
                      <em>staff</em>
                    </p>
                  </div>

                  <p className="text-white mb-0">
                    your favourite coffee daily consectetur.
                  </p>
                </div>

                <div className="team-block-image-wrap">
                  <img
                    src={img5}
                    className="team-block-image img-fluid"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="menu-section section-padding" id="section_3">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12 mb-4 mb-lg-0">
              <div className="menu-block-wrap">
                <div className="text-center mb-4 pb-lg-2">
                  <em className="text-white">Delicious Menu</em>
                  <h4 className="text-white">Breakfast</h4>
                </div>

                <div className="menu-block">
                  <div className="d-flex">
                    <h6>Pancakes</h6>

                    <span className="underline"></span>

                    <strong className="ms-auto">₦5,000</strong>
                  </div>

                  <div className="border-top mt-2 pt-2">
                    <small>Fresh brewed coffee and steamed milk</small>
                  </div>
                </div>

                <div className="menu-block my-4">
                  <div className="d-flex">
                    <h6>Toasted Waffle</h6>

                    <span className="underline"></span>

                    <strong className="text-white ms-auto">
                      <del>₦10,000</del>
                    </strong>

                    <strong className="ms-2">₦15,000</strong>
                  </div>

                  <div className="border-top mt-2 pt-2">
                    <small>Brewed coffee and steamed milk</small>
                  </div>
                </div>

                <div className="menu-block">
                  <div className="d-flex">
                    <h6>
                      Fried Chips
                      <span className="badge ms-3">Recommend</span>
                    </h6>

                    <span className="underline"></span>

                    <strong className="ms-auto">₦5,000</strong>
                  </div>

                  <div className="border-top mt-2 pt-2">
                    <small>Rich Milk and Foam</small>
                  </div>
                </div>

                <div className="menu-block my-4">
                  <div className="d-flex">
                    <h6>Doughnut</h6>

                    <span className="underline"></span>

                    <strong className="ms-auto">₦12,000</strong>
                  </div>

                  <div className="border-top mt-2 pt-2">
                    <small>Fresh brewed coffee and steamed milk</small>
                  </div>
                </div>

                <div className="menu-block">
                  <div className="d-flex">
                    <h6>Banana Cakes</h6>

                    <span className="underline"></span>

                    <strong className="ms-auto">₦20,000</strong>
                  </div>

                  <div className="border-top mt-2 pt-2">
                    <small>Rich Milk and Foam</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-12">
              <div className="menu-block-wrap">
                <div className="text-center mb-4 pb-lg-2">
                  <em className="text-white">Favourite Menu</em>
                  <h4 className="text-white">Coffee</h4>
                </div>

                <div className="menu-block">
                  <div className="d-flex">
                    <h6>Latte</h6>

                    <span className="underline"></span>

                    <strong className="text-white ms-auto">
                      <del>₦15,000</del>
                    </strong>

                    <strong className="ms-2">₦1,500</strong>
                  </div>

                  <div className="border-top mt-2 pt-2">
                    <small>Fresh brewed coffee and steamed milk</small>
                  </div>
                </div>

                <div className="menu-block my-4">
                  <div className="d-flex">
                    <h6>
                      White Coffee
                      <span className="badge ms-3">Recommend</span>
                    </h6>

                    <span className="underline"></span>

                    <strong className="ms-auto">₦30,000</strong>
                  </div>

                  <div className="border-top mt-2 pt-2">
                    <small>Brewed coffee and steamed milk</small>
                  </div>
                </div>

                <div className="menu-block">
                  <div className="d-flex">
                    <h6>Chocolate Milk</h6>

                    <span className="underline"></span>

                    <strong className="ms-auto">₦25,000</strong>
                  </div>

                  <div className="border-top mt-2 pt-2">
                    <small>Rich Milk and Foam</small>
                  </div>
                </div>

                <div className="menu-block my-4">
                  <div className="d-flex">
                    <h6>Greentea</h6>

                    <span className="underline"></span>

                    <strong className="ms-auto">₦20,000</strong>
                  </div>

                  <div className="border-top mt-2 pt-2">
                    <small>Fresh brewed coffee and steamed milk</small>
                  </div>
                </div>

                <div className="menu-block">
                  <div className="d-flex">
                    <h6>Dark Chocolate</h6>

                    <span className="underline"></span>

                    <strong className="ms-auto">₦30,000</strong>
                  </div>

                  <div className="border-top mt-2 pt-2">
                    <small>Rich Milk and Foam</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="reviews-section section-padding section-bg"
        id="section_4"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-12 text-center mb-4 pb-lg-2">
              <em className="text-white">Reviews by Customers</em>

              <h2 className="text-white">Testimonials</h2>
            </div>

            <div className="timeline">
              <div className="timeline-container timeline-container-left">
                <div className="timeline-content">
                  <div className="reviews-block">
                    <div className="reviews-block-image-wrap d-flex align-items-center">
                      <img src={img6} className="reviews-block-image" alt="" />

                      <div className="">
                        <h6 className="text-white mb-0">Sandra</h6>
                        <em className="text-white"> Customers</em>
                      </div>
                    </div>

                    <div className="reviews-block-info">
                      <p>
                       <p> "Best coffee I've ever had!"</p>
                     "I tried the house blend, and it’s simply the best coffee I've ever tasted. The rich aroma and smooth flavor make my mornings so much better. Highly recommended!"
                      </p>

                      <div className="d-flex border-top pt-3 mt-4">
                        <strong className="text-white">
                          4.5 <small className="ms-2">Rating</small>
                        </strong>

                        <div className="reviews-group ms-auto">
                          <i className="bi-star-fill"></i>
                          <i className="bi-star-fill"></i>
                          <i className="bi-star-fill"></i>
                          <i className="bi-star-fill"></i>
                          <i className="bi-star"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="timeline-container timeline-container-right">
                <div className="timeline-content">
                  <div className="reviews-block">
                    <div className="reviews-block-image-wrap d-flex align-items-center">
                      <img
                        src={img7}
                        className="reviews-block-image img-fluid"
                        alt=""
                      />

                      <div className="">
                        <h6 className="text-white mb-0">Don</h6>
                        <em className="text-white"> Customers</em>
                      </div>
                    </div>

                    <div className="reviews-block-info">
                      <p>
                        <p>"A true coffee lover’s paradise."</p>
                        "The variety and quality of the beans are incredible. You can tell that a lot of care goes into selecting and roasting them. I've become a loyal customer!"
                      </p>

                      <div className="d-flex border-top pt-3 mt-4">
                        <strong className="text-white">
                          4.5 <small className="ms-2">Rating</small>
                        </strong>

                        <div className="reviews-group ms-auto">
                          <i className="bi-star-fill"></i>
                          <i className="bi-star-fill"></i>
                          <i className="bi-star-fill"></i>
                          <i className="bi-star-fill"></i>
                          <i className="bi-star"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="timeline-container timeline-container-left">
                <div className="timeline-content">
                  <div className="reviews-block">
                    <div className="reviews-block-image-wrap d-flex align-items-center">
                      <img
                        src={img8}
                        className="reviews-block-image img-fluid"
                        alt=""
                      />

                      <div className="">
                        <h6 className="text-white mb-0">Olivia</h6>
                        <em className="text-white"> Customers</em>
                      </div>
                    </div>

                    <div className="reviews-block-info">
                      <p>
                        <p>"Quick delivery and amazing flavor!"</p>
                        "I was pleasantly surprised at how quickly my order arrived. The coffee is freshly roasted, and the flavor is full-bodied and perfect. This is definitely my new go-to!"
                      </p>

                      <div className="d-flex border-top pt-3 mt-4">
                        <strong className="text-white">
                          4.5 <small className="ms-2">Rating</small>
                        </strong>

                        <div className="reviews-group ms-auto">
                          <i className="bi-star-fill"></i>
                          <i className="bi-star-fill"></i>
                          <i className="bi-star-fill"></i>
                          <i className="bi-star-fill"></i>
                          <i className="bi-star"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section section-padding" id="section_5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-12">
              <em className="text-white">Say Hello</em>
              <h2 className="text-white mb-4 pb-lg-2">Contact</h2>
            </div>

            <div className="col-lg-6 col-12">
              <form ref={form} onSubmit={sendEmail}
                action="#"
                method="post"
                className="custom-form contact-form"
                role="form"
              >
                <div className="row">
                  <div className="col-lg-6 col-12">
                    <label for="name" className="form-label">
                      Name <sup className="text-danger">*</sup>
                    </label>

                    <input
                      type="text"
                      name="user_name"
                      id="user_name"
                      className="form-control"
                      placeholder=""
                      value={user?.fulllname}
                      required=""
                    />
                  </div>

                  <div className="col-lg-6 col-12">
                    <label for="email" className="form-label">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="user_email"
                      id="user_email"
                      pattern="[^ @]*@[^ @]*"
                      className="form-control"
                      placeholder="your email address"
                      required=""
                    />
                  </div>

                  <div className="col-12">
                    <label for="message" className="form-label">
                      How can we help?
                    </label>

                    <textarea
                      name="message"
                      rows="4"
                      className="form-control"
                      id="message"
                      placeholder="Message"
                      required=""
                    ></textarea>
                  </div>
                </div>

                <div className="col-lg-5 col-12 mx-auto mt-3">
                  <button type="submit" className="form-control">
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            <div className="col-lg-6 col-12 mx-auto mt-5 mt-lg-0 ps-lg-5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.323284220256!2d4.260111073602662!3d8.170149001844038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10370f4acebc0aeb%3A0xec97d754a04c675e!2sLautech%20University!5e0!3m2!1sen!2sng!4v1727103129376!5m2!1sen!2sng"
                width="600"
                height="450"
                style={{ border: "0" }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                className="map"
              ></iframe>
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
    </div>
  );
};

export default Home;
