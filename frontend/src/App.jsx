import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import TourListings from "./pages/TourListings";
import TourDetails from "./pages/TourDetails";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import AccountLogin from "./pages/AccountLogin";
import AccountRegister from "./pages/AccountRegister";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import UserAccount from "./pages/UserAccount";

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
        <Route path="/login" element={<AccountLogin />} />
        <Route path="/register" element={<AccountRegister />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/useraccount" element={<UserAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
