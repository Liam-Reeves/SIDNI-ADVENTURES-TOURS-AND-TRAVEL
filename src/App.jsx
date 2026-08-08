import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import TourListings from "./pages/TourListings";
import TourDetails from "./pages/TourDetails";
import Contact from "./pages/Contact";
import AccountLogin from "./pages/AccountLogin";
import AccountRegister from "./pages/AccountRegister";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tourlistings" element={<TourListings />} />
        <Route path="/tourdetails" element={<TourDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<AccountLogin />} />
        <Route path="/register" element={<AccountRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
