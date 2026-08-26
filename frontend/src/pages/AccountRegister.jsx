import "./css/AccountRegister.css";
import { Link } from "react-router-dom";

import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";

export default function AccountRegister() {
  return (
    <>
      <MainNavbar />

      <main className="account-auth account-register">
        <section className="auth-panel auth-panel--form">
          <div className="auth-panel__header">
            <p className="auth-panel__eyebrow">Create account</p>
            <h1>Join Sidni Adventures</h1>
          </div>

          <form className="auth-form">
            <div className="auth-form__grid">
              <label>
                First name
                <input type="text" placeholder="John" />
              </label>

              <label>
                Last name
                <input type="text" placeholder="Doe" />
              </label>
            </div>

            <label>
              Email address
              <input type="email" placeholder="you@example.com" />
            </label>

            <label>
              Phone number
              <input type="tel" placeholder="+254 ..." />
            </label>

            <label>
              Password
              <input type="password" placeholder="Create a password" />
            </label>

            <label>
              Confirm password
              <input type="password" placeholder="Repeat password" />
            </label>

            <button type="submit" className="auth-button">
              Create account
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </section>

        <aside className="auth-panel auth-panel--promo">
          <p className="auth-panel__eyebrow">Why travellers sign up</p>
          <h2>Your trip, tailored to you.</h2>
          <ul>
            <li>Save favorite destinations and experiences</li>
            <li>Track upcoming adventures and bookings</li>
            <li>Receive special offers and itinerary updates</li>
          </ul>
        </aside>
      </main>

      <Footer />
    </>
  );
}
