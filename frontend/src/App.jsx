import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import TourListings from "./pages/TourListings";
import TourDetails from "./pages/TourDetails";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";

import UserAccount from "./pages/UserAccount";

import Payment from "./pages/Payment";
import MpesaPayment from "./pages/MpesaPayment";
import CardPayment from "./pages/CardPayment";
import PaypalPayment from "./pages/PaypalPayment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tourlistings" element={<TourListings />} />
        <Route
          path="/tourdetails"
          element={<Navigate to="/tourdetails/1" replace />}
        />
        <Route path="/tourdetails/:tourId" element={<TourDetails />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/useraccount" element={<UserAccount />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/mpesa" element={<MpesaPayment />} />
        <Route path="/payment/card" element={<CardPayment />} />
        <Route path="/payment/paypal" element={<PaypalPayment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
