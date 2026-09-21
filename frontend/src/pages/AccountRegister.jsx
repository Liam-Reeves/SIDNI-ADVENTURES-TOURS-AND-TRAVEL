import "./css/AccountRegister.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";
import { registerUser, loginUser } from "../api";

export default function AccountRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        username: form.username || form.email,
        email: form.email,
        password: form.password,
        first_name: form.first_name,
        last_name: form.last_name,
        phone_number: form.phone_number,
      });

      await loginUser({
        email: form.email,
        password: form.password,
      });

      navigate("/booking");
    } catch (err) {
      const message = err?.response?.data;
      setError(
        typeof message === "object"
          ? Object.values(message).flat().join(" ")
          : message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MainNavbar />

      <main className="account-auth account-register">
        <section className="auth-panel auth-panel--form">
          <div className="auth-panel__header">
            <p className="auth-panel__eyebrow">Create account</p>
            <h1>Join Sidni Adventures</h1>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-form__grid">
              <label>
                First name
                <input
                  type="text"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  placeholder="John"
                  required
                />
              </label>

              <label>
                Last name
                <input
                  type="text"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                />
              </label>
            </div>

            <label>
              Username
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="yourname"
              />
            </label>

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
              Phone number
              <input
                type="tel"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                placeholder="+254 ..."
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </label>

            <label>
              Confirm password
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat password"
                required
              />
            </label>

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
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
