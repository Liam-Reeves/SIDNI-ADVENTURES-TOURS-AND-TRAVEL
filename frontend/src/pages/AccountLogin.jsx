import "./css/AccountLogin.css";
import { Link } from "react-router-dom";

import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";

export default function AccountLogin() {
  return (
    <>
      <MainNavbar />

      <main className="account-auth account-login">
        <section className="auth-panel auth-panel--form">
          <div className="auth-panel__header">
            <p className="auth-panel__eyebrow">Welcome back</p>
            <h1>Login to your account</h1>
          </div>

          <form className="auth-form">
            <label>
              Email address
              <input type="email" placeholder="you@example.com" />
            </label>

            <label>
              Password
              <input type="password" placeholder="Enter your password" />
            </label>

            <div className="auth-form__row">
              <label className="checkbox-row">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <Link to="/register" className="auth-link">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="auth-button">
              Login
            </button>
          </form>

          <p className="auth-switch">
            Don’t have an account? <Link to="/register">Create one</Link>
          </p>
        </section>

        <aside className="auth-panel auth-panel--promo">
          <p className="auth-panel__eyebrow">Adventure starts here</p>
          <h2>Plan your next unforgettable journey.</h2>
          <ul>
            <li>Exclusive safari and beach packages</li>
            <li>Flexible custom itineraries</li>
            <li>Priority support from travel experts</li>
          </ul>
        </aside>
      </main>

      <Footer />
    </>
  );
}
