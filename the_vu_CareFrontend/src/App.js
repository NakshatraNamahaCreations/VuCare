import React, { useEffect } from "react";
// import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
import Career from "./Pages/Career/Career";
// import Header from "./Components/Header/Header";
// import AppLink from "./Pages/Home/Component/AppLink/AppLink";
import Footer from "./Component/Footer";
import ResetPassword from "./Component/ResetPassword/ResetPassword";
import ServicesView from "./Pages/ServicesView/ServicesView";
import ViewCart from "./Pages/ViewCart/ViewCart";
import Booking from "./Pages/Booking/Booking";
import BookingDetails from "./Pages/BookingDetail/BookingDetails";
import Servicedetails from "./Component/Servicedetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="Register" element={<Register />} />
        <Route path="career" element={<Career />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="ServicesView" element={<ServicesView />} />
        <Route path="viewcart" element={<ViewCart />} />
        <Route path="booking" element={<Booking />} />
        <Route path="bookingdetails" element={<BookingDetails />} />
        <Route path="servicedetails" element={<Servicedetails />} />
      </Routes>
      {/* <AppLink /> */}
      <Footer />
    </>
  );
}

export default App;
