import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaLock, FaMobileAlt } from "react-icons/fa";
import "./css/MpesaPayment.css";

const API_URL = "http://localhost:8000";

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
        total_amount: tour.price,
        tour_title: tour.title,
        location: tour.location,
      })
    );
  } catch {
    return null;
  }
}

export default function MpesaPayment() {
  const [phone, setPhone] = useState("");
  const [paymentId, setPaymentId] = useState(null);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [receipt, setReceipt] = useState("");
  const [loading, setLoading] = useState(false);
  const [booking] = useState(getCheckoutItem);

  useEffect(() => {
    if (!paymentId) return undefined;
    const timer = window.setInterval(async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/payments/${paymentId}/status/`,
        );
        const data = await response.json();
        setStatus(data.status);
        setMessage(data.message);
        setReceipt(data.receipt || "");
        if (data.status === "SUCCESS" || data.status === "FAILED") {
          window.clearInterval(timer);
          setLoading(false);
        }
      } catch {
        setMessage(
          "Checking payment status failed. Please check again shortly.",
        );
      }
    }, 3000);
    return () => window.clearInterval(timer);
  }, [paymentId]);

  async function makePayment(event) {
    event.preventDefault();
    if (!booking?.total_amount) {
      setStatus("FAILED");
      setMessage("No tour amount was found. Return to the tour and try again.");
      return;
    }
    setLoading(true);
    setStatus("PENDING");
    setMessage("Starting payment...");
    setReceipt("");
    try {
      const response = await fetch(`${API_URL}/api/payments/start/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount: booking.total_amount }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Payment could not start");
      setPaymentId(data.payment_id);
      setMessage("Check your phone and enter your M-Pesa PIN.");
    } catch (error) {
      setStatus("FAILED");
      setMessage(error.message);
      setLoading(false);
    }
  }

  return (
    <main className="mpesa-page">
      <section className="mpesa-shell">
        <div className="mpesa-intro">
          <Link to="/payment" className="payment-back">
            <FaArrowLeft /> Back to payment methods
          </Link>
          <span className="mpesa-kicker">M-Pesa checkout</span>
          <div className="mpesa-heading-row">
            <div>
              <h1>Pay with M-Pesa</h1>
              <p>{booking?.tour_title || "Your selected adventure"}</p>
            </div>
            <div className="mpesa-mark" aria-label="M-Pesa">
              <span>M</span>
              <small>PESA</small>
            </div>
          </div>
        </div>
        <div className="mpesa-content">
          <form className="mpesa-form-card" onSubmit={makePayment}>
            <div className="mpesa-card-heading">
              <div className="mpesa-icon">
                <FaMobileAlt />
              </div>
              <div>
                <h2>Payment details</h2>
                <p>We will send an STK prompt to this number.</p>
              </div>
            </div>
            <label>
              M-Pesa phone number
              <span className="mpesa-phone-field">
                <b>+254</b>
                <input
                  type="tel"
                  placeholder="712 345 678"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                />
              </span>
            </label>
            <div className="mpesa-amount-display">
              <span>Amount due</span>
              <strong>
                KES {Number(booking?.total_amount || 0).toFixed(2)}
              </strong>
              <small>{booking?.location || "Kenya"}</small>
            </div>
            <div className="mpesa-security-note">
              <FaLock />
              <span>
                Your PIN is entered securely on your phone and never shared with
                us.
              </span>
            </div>
            <button className="mpesa-submit" type="submit" disabled={loading}>
              {loading ? "Waiting for confirmation" : "Pay now"}
              <span className="mpesa-submit-arrow">→</span>
            </button>
          </form>
          <aside className="mpesa-status-card" aria-live="polite">
            <span className="mpesa-kicker">Payment status</span>
            <div
              className={`mpesa-status-badge mpesa-status-badge--${status.toLowerCase() || "idle"}`}
            >
              <span className="mpesa-status-dot" />
              {status || "Ready to pay"}
            </div>
            <div className="mpesa-steps">
              <div className={`mpesa-step ${status ? "is-active" : ""}`}>
                <span>1</span>
                <div>
                  <strong>Start payment</strong>
                  <small>Submit your phone number</small>
                </div>
              </div>
              <div
                className={`mpesa-step ${status === "PENDING" ? "is-active" : ""}`}
              >
                <span>2</span>
                <div>
                  <strong>Approve on phone</strong>
                  <small>Enter your M-Pesa PIN</small>
                </div>
              </div>
              <div
                className={`mpesa-step ${status === "SUCCESS" ? "is-success" : ""}`}
              >
                <span>3</span>
                <div>
                  <strong>Payment complete</strong>
                  <small>Receipt issued instantly</small>
                </div>
              </div>
            </div>
            {status && <p className="mpesa-status-message">{message}</p>}
            {receipt && (
              <div className="mpesa-receipt">
                <span>Receipt number</span>
                <strong>{receipt}</strong>
              </div>
            )}
            {paymentId && (
              <small className="mpesa-reference">
                Payment number: {paymentId}
              </small>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
