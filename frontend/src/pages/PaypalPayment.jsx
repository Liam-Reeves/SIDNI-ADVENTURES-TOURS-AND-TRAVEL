import "./css/Payment.css";
import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaPaypal, FaLock } from "react-icons/fa";

function getCheckoutItem() {
  try {
    const booking = JSON.parse(
      localStorage.getItem("sidni_selected_booking") || "null",
    );
    const tour = JSON.parse(
      localStorage.getItem("sidni_selected_tour") || "null",
    );
    return (
      booking ||
      (tour && {
        tour_title: tour.title,
        location: tour.location,
        total_amount: tour.price,
        number_of_people: 1,
      })
    );
  } catch {
    return null;
  }
}

export default function PaypalPayment() {
  const item = getCheckoutItem();
  return (
    <>
      <MainNavbar />
      <main className="payment-page payment-page--method">
        <section className="method-checkout">
          <Link to="/payment" className="payment-back">
            <FaArrowLeft /> Back to payment methods
          </Link>
          <div className="method-checkout__header">
            <span className="method-icon method-icon--paypal">
              <FaPaypal />
            </span>
            <div>
              <p className="section-kicker">PayPal checkout</p>
              <h1>Pay with PayPal</h1>
            </div>
          </div>
          <div className="method-checkout__grid">
            <div className="method-form">
              <label>
                PayPal email
                <input type="email" placeholder="you@example.com" />
              </label>
              <div className="method-note">
                <FaLock /> You will be redirected to PayPal to authorize this
                payment.
              </div>
              <button type="button" className="method-submit" disabled>
                Continue with PayPal · KES{" "}
                {Number(item?.total_amount || 0).toFixed(2)}
              </button>
              <small className="method-helper">
                PayPal processing is not enabled yet. Choose M-Pesa to complete
                a live payment.
              </small>
            </div>
            <aside className="method-summary">
              <p className="section-kicker">Booking total</p>
              <h2>{item?.tour_title || "Adventure booking"}</h2>
              <span>{item?.location || "Kenya"}</span>
              <strong>KES {Number(item?.total_amount || 0).toFixed(2)}</strong>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
