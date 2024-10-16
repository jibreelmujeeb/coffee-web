import React, { useEffect, useState } from "react";
import "../Home/Home.css";
import reserve1 from "../assets/images/barman-with-fruits.jpg";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";

const Reserve = () => {
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    if (!localStorage.user) {
      navigate("/login");
    }
  }, [navigate]);

  // Initialize form state
  const [first, setFirst] = useState(JSON.parse(localStorage.getItem("user")));
  const [formData, setFormData] = useState({
    email: first?.email || "",
    phone: "",
    time: "18:30",
    date: "",
    bookingType: "",
    numberOfPeople: "",
    comment: "",
    amount: 0,
    menuSelect: [],
    menuAmounts: {}, // Object to store amounts for each menu item
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, options, checked } = e.target;
    if (type === "select-multiple") {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setFormData({
        ...formData,
        [name]: selectedOptions,
        menuAmounts: selectedOptions.reduce((acc, option) => {
          acc[option] = formData.menuAmounts[option] || 0;
          return acc;
        }, {}),
      });
    } else if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle amount change for menu items
  const handleMenuAmountChange = (menu, amount) => {
    setFormData({
      ...formData,
      menuAmounts: {
        ...formData.menuAmounts,
        [menu]: amount,
      },
    });
  };

  const menuPrices = {
    Pancake: 5000,
    Toasted: 15000,
    ChipsRecommend: 5000,
    Banana: 20000,
    Latte: 1500,
    Doughnut: 12000,
    ChocolateMilk: 25000,
    Greentea: 20000,
    DarkChocolate: 30000,
    WhiteCoffeeRecommend: 30000,
  };
  
  const calculateTotalAmount = (formData) => {
    const { menuSelect, menuAmounts } = formData;
  
    // Calculate total amount based on selected menu and their quantities
    const totalAmount = menuSelect.reduce((total, menu) => {
      const quantity = parseInt(menuAmounts[menu], 10); // Ensure quantity is treated as a number
      const price = menuPrices[menu];
      console.log(quantity, price);
      
      
      // Ensure we only calculate if the menu item exists in the prices list and has a valid quantity
      if (price && quantity > 0) {
        total += price * quantity;
      }
  
      return total;
    }, 0); // 0 is the initial value of the total amount
  
    return totalAmount;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let totalAmount = calculateTotalAmount(formData);
    axios
      .post("http://localhost:3000/booking", {
        ...formData,
        amount: totalAmount,
      })
      .then((response) => {
        if (response.data.status) {
          window.location.href = response.data.authorization_url;
          Swal.fire({
            icon: "success",
            title: "Good job",
            text: response.data.msg,
          });
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <div>
      <div className="reservation-page">
        <main>
          <Navbar />
          <section className="">
            <div className="" />
            <div className="p-0">
              <div className="col-lg-11 mx-auto">
                <div className="booking-form-wrap mt-0">
                  <div className="row">
                    <div className="col-lg-7 col-12 p-0">
                      <form
                        className="custom-form booking-form"
                        onSubmit={handleSubmit}
                      >
                        <div className="text-center mb-4 pb-lg-2">
                          <em className="text-white">
                            Fill out the booking form
                          </em>
                          <h2 className="text-white">Book a table</h2>
                        </div>
                        <div className="booking-form-body">
                          <div className="row">
                            <div className="col-lg-6 col-12">
                              <input
                                type="text"
                                name="email"
                                className="form-control border-0"
                                placeholder="Full Name"
                                required
                                value={formData.email}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col-lg-6 col-12">
                              <input
                                type="tel"
                                name="phone"
                                className="form-control"
                                placeholder="Phone: 085 456 7890"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col-lg-6 col-12">
                              <input
                                type="time"
                                name="time"
                                className="form-control"
                                value={formData.time}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col-lg-6 col-12">
                              <input
                                type="date"
                                name="date"
                                className="form-control"
                                required
                                value={formData.date}
                                onChange={handleChange}
                              />
                            </div>

                            <div className="col-lg-6 col-12">
                              <select
                                name="bookingType"
                                className="w-100 border bg-transparent"
                                style={{ height: "40px" }}
                                value={formData.bookingType}
                                onChange={handleChange}
                              >
                                <option value="" disabled>
                                  Booking type
                                </option>
                                <option value="Pick it up">Pick it up</option>
                                <option value="Delivery by company">
                                  Delivery by company
                                </option>
                              </select>
                            </div>

                            <div className="col-lg-6 col-12 mt-3">
                              <select
                                name="menuSelect"
                                multiple
                                className="w-100 border bg-transparent"
                                style={{ height: "200px" }}
                                value={formData.menuSelect}
                                onChange={handleChange}
                              >
                                <option value="" disabled>
                                  Menu selector
                                </option>
                                <option value="Pancake">Pancakes(₦5,000)</option>
                                <option value="Toasted">Toasted Waffle( ₦15,000)</option>
                                <option value="ChipsRecommend"> Fried ChipsRecommend(₦5,000)</option>
                                <option value="Doughnut">Doughnut(₦12,000)</option>
                                <option value="Banana">Banana Cakes(₦20,000)</option>
                                <option value="Latte">Latte(₦1,500)</option>
                                <option value="WhiteCoffeeRecommend">White CoffeeRecommend(₦30,000)</option>
                                <option value="ChocolateMilk">Chocolate Milk(₦25,000)</option>
                                <option value="Greentea">Greentea(₦20,000)</option>
                                <option value="DarkChocolate">Dark Chocolate(₦30,000)</option>
                              </select>
                            </div>

                            {formData.menuSelect.map((menu) => (
                              <div key={menu} className="col-lg-6 col-12">
                                <input
                                  type="number"
                                  name={`menuAmounts[${menu}]`}
                                  className="form-control"
                                  placeholder={`Amount for ${menu}`}
                                  value={formData.menuAmounts[menu] || ""}
                                  onChange={(e) =>
                                    handleMenuAmountChange(menu, e.target.value)
                                  }
                                />
                              </div>
                            ))}

                            <div className="col-lg-12 col-12 mt-4">
                              <input
                                type="number"
                                name="numberOfPeople"
                                className="form-control"
                                placeholder="Number of People"
                                required
                                value={formData.numberOfPeople}
                                onChange={handleChange}
                              />
                              <textarea
                                name="comment"
                                rows="3"
                                className="form-control"
                                placeholder="what you want and Your Address"
                                value={formData.comment}
                                onChange={handleChange}
                              ></textarea>
                            </div>
                            <div className="col-lg-4 col-md-10 col-8 mx-auto mt-2">
                              <button type="submit" className="form-control">
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col-lg-5 col-12 p-0">
                      <div className="booking-form-image-wrap">
                        <img
                          src={reserve1}
                          className="booking-form-image img-fluid"
                          alt=""
                        />
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
                  <em className="text-white d-block mb-4">
                    Where to find us?
                  </em>

                  <strong className="text-white">
                    <i className="bi-geo-alt me-2"></i>
                    Jibreel Coffee Shop, 1234 Main St, Ogbomoso, Nigeria
                  </strong>

                  <ul className="social-icon mt-4">
                    <li className="social-icon-item">
                      <a
                        href="#"
                        className="social-icon-link bi-facebook"
                      ></a>
                    </li>

                    {/* <li className="social-icon-item">
                      <a
                        href="https://x.com/minthu"
                        target="_new"
                        className="social-icon-link bi-twitter"
                      ></a */}
</ul>
</div>
</div>
</div>
</footer>
</main>
</div>
</div>
  )};

  export default Reserve;