import React from "react";
import { Routes, Route } from "react-router-dom";
import SignupForm from "./Components/Signup";
import LoginForm from "./Components/Login";
import ErrorPage from "./Components/ErrorPage";
import AdminLogin from "./Components/AdLogin";
import AdminSignup from "./Components/Adsignup";
import NotFound from "./Components/Notfound";
import Landing from "./Components/landingPage";
import Home from "./Home/Home";
import AdForgotPassword from "./Components/AdForgetPassword";
import Logout from "./Home/Logout";
import Reserve from "./Reservation/Reserve";
import BookingHistory from "./history/BookingHistory";
import Admin from "./Components/Admin";
import AdminToken from "./Components/verifyToken";
import ForgotPassword from "./Components/forgetPassword";
import ResetPassword from "./Components/ResetPassword";
import AdResetPassword from "./Components/AdResetPassword";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/admin/dashboard" element={<Admin />} />
      <Route path="/admin/token/:token" element={<AdminToken />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminSignup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/reserve" element={<Reserve />} />
      <Route path="/history" element={<BookingHistory />} />
      <Route path="/user/logout" element={<Logout />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/admin/forgot-password" element={<AdForgotPassword />} /> 
      <Route path="/admin/reset-password/:token" element={<AdResetPassword />} /> 
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
