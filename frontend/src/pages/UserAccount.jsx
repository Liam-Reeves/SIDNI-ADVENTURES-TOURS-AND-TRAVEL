import "./css/UserAccount.css";
import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import {
  FaBell,
  FaCalendarCheck,
  FaCreditCard,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";

const profile = {
  name: "Amina Njeri",
  email: "amina.njeri@sidniadventures.com",
  phone: "+254 712 345 678",
  location: "Nairobi, Kenya",
  memberSince: "March 2024",
};

const paymentInfo = {
  method: "Visa •••• 2458",
  expiry: "08/29",
  billingAddress: "Upper Hill, Nairobi",
};

const previousBookings = [
  {
    title: "Golden Coast Escape",
    date: "18 Sep 2026",
    travelers: 2,
    status: "Confirmed",
    amount: 360,
  },
  {
    title: "Big Five Safari",
    date: "02 Oct 2026",
    travelers: 3,
    status: "Pending",
    amount: 960,
  },
  {
    title: "Savannah Sunrise Drive",
    date: "12 Nov 2025",
    travelers: 1,
    status: "Completed",
    amount: 95,
  },
];

export default function UserAccount() {
  const totalSpent = previousBookings.reduce(
    (sum, booking) => sum + booking.amount,
    0,
  );

  return (
    <>
      <MainNavbar />

      <main className="user-account-page">
        <section className="account-header">
          <div>
            <p className="section-kicker">Traveler account</p>
            <h1>Welcome back, {profile.name.split(" ")[0]}</h1>
          </div>
          <Button
            as={Link}
            to="/booking"
            variant="primary"
            className="account-header__button"
          >
            View bookings
          </Button>
        </section>

        <section className="account-grid">
          <aside className="account-panel account-panel--profile">
            <div className="account-avatar">
              <FaUser />
            </div>
            <h2>{profile.name}</h2>
            <p className="account-role">Premium traveler</p>

            <div className="account-mini-list">
              <div>
                <FaEnvelope />
                <span>{profile.email}</span>
              </div>
              <div>
                <FaPhoneAlt />
                <span>{profile.phone}</span>
              </div>
              <div>
                <FaMapMarkerAlt />
                <span>{profile.location}</span>
              </div>
            </div>
          </aside>

          <div className="account-panel account-panel--summary">
            <div className="summary-stat">
              <span>Total spent</span>
              <strong>${totalSpent}</strong>
            </div>
            <div className="summary-stat">
              <span>Trips booked</span>
              <strong>{previousBookings.length}</strong>
            </div>
            <div className="summary-stat">
              <span>Member since</span>
              <strong>{profile.memberSince}</strong>
            </div>
          </div>
        </section>

        <section className="account-section-grid">
          <article className="account-panel">
            <div className="panel-heading">
              <FaCreditCard />
              <h3>Payment info</h3>
            </div>

            <div className="payment-card-box">
              <div className="payment-card-box__top">
                <span>Primary card</span>
                <span className="chip">Visa</span>
              </div>
              <strong>{paymentInfo.method}</strong>
              <div className="payment-card-box__meta">
                <span>Expiry {paymentInfo.expiry}</span>
                <span>{paymentInfo.billingAddress}</span>
              </div>
            </div>

            <div className="detail-list">
              <div>
                <span>Billing address</span>
                <strong>{paymentInfo.billingAddress}</strong>
              </div>
              <div>
                <span>Notification</span>
                <strong>Email receipts enabled</strong>
              </div>
            </div>
          </article>

          <article className="account-panel">
            <div className="panel-heading">
              <FaCalendarCheck />
              <h3>Previous bookings</h3>
            </div>

            <div className="booking-history">
              {previousBookings.map((booking) => (
                <div key={booking.title} className="booking-history__item">
                  <div>
                    <h4>{booking.title}</h4>
                    <p>{booking.date}</p>
                  </div>
                  <div className="booking-history__meta">
                    <span>{booking.travelers} travelers</span>
                    <strong>${booking.amount}</strong>
                  </div>
                  <span
                    className={`status-pill status-pill--${booking.status.toLowerCase()}`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="account-panel account-panel--personal">
          <div className="panel-heading">
            <FaBell />
            <h3>Personal details</h3>
          </div>

          <div className="profile-details-grid">
            <div>
              <span>Full name</span>
              <strong>{profile.name}</strong>
            </div>
            <div>
              <span>Email</span>
              <strong>{profile.email}</strong>
            </div>
            <div>
              <span>Phone</span>
              <strong>{profile.phone}</strong>
            </div>
            <div>
              <span>Location</span>
              <strong>{profile.location}</strong>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
