import "./css/AccountLogin.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";
import { loginUser } from "../api";

export default function AccountLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser({
        email: form.email,
        password: form.password,
      });

      navigate("/booking");
    } catch (err) {
      setError(
        err?.response?.data?.detail || "Unable to log in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MainNavbar />

      <main className="account-auth account-login">
        <section className="auth-panel auth-panel--form">
          <div className="auth-panel__header">
            <p className="auth-panel__eyebrow">Welcome back</p>
            <h1>Login to your account</h1>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Email address
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
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

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
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
