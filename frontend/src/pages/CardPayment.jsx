import "./css/Payment.css";
import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaCreditCard, FaLock } from "react-icons/fa";

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

export default function CardPayment() {
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
            <span className="method-icon method-icon--card">
              <FaCreditCard />
            </span>
            <div>
              <p className="section-kicker">Card checkout</p>
              <h1>Pay securely by card</h1>
            </div>
          </div>
          <div className="method-checkout__grid">
            <div className="method-form">
              <label>
                Cardholder name
                <input type="text" placeholder="Name on card" />
              </label>
              <label>
                Card number
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="1234 5678 9012 3456"
                />
              </label>
              <div className="method-form__row">
                <label>
                  Expiry
                  <input type="text" placeholder="MM / YY" />
                </label>
                <label>
                  CVV
                  <input type="password" placeholder="123" />
                </label>
              </div>
              <div className="method-note">
                <FaLock /> Card payments will be connected to your selected
                provider.
              </div>
              <button type="button" className="method-submit" disabled>
                Pay KES {Number(item?.total_amount || 0).toFixed(2)}
              </button>
              <small className="method-helper">
                Card processing is not enabled yet. Choose M-Pesa to complete a
                live payment.
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
