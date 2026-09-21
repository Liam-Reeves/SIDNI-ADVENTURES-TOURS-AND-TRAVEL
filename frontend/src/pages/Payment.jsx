import "./css/Payment.css";
import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCreditCard, FaLock, FaMobileAlt, FaPaypal } from "react-icons/fa";
import { createMpesaPayment, createPaymentIntent } from "../api";

const countryCodes = [
  { code: "+254", country: "Kenya" },
  { code: "+255", country: "Tanzania" },
  { code: "+256", country: "Uganda" },
  { code: "+233", country: "Ghana" },
];

const paymentBrandLogos = {
  card: [
    "https://upload.wikimedia.org/wikipedia/commons/5/5c/Visa_Inc._logo_%282021%E2%80%93present%29.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
    "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg",
  ],
  paypal: "https://upload.wikimedia.org/wikipedia/commons/3/39/PayPal_logo.svg",
  mpesa:
    "https://upload.wikimedia.org/wikipedia/commons/0/03/M-pesa-logo.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
};

export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [phoneNumber, setPhoneNumber] = useState("712345678");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [booking] = useState(() => {
    try {
      const savedBooking = localStorage.getItem("sidni_selected_booking");
      const selectedTour = localStorage.getItem("sidni_selected_tour");

      if (savedBooking) {
        return JSON.parse(savedBooking);
      }

      if (selectedTour) {
        const parsedTour = JSON.parse(selectedTour);
        return {
          id: "temp-booking",
          total_amount: parsedTour.price || 0,
          number_of_people: 1,
          tour_title: parsedTour.title,
          location: parsedTour.location,
        };
      }
    } catch {
      return null;
    }

    return null;
  });

  const bookingSummary = {
    title: booking?.tour_title || "Your trip",
    travelers: Number(booking?.number_of_people || 1),
    subtotal: Number(booking?.total_amount || 0),
    serviceFee: Number(booking?.total_amount || 0) * 0.08,
    taxes: Number(booking?.total_amount || 0) * 0.03,
  };

  const total =
    bookingSummary.subtotal + bookingSummary.serviceFee + bookingSummary.taxes;

  const handlePaymentSubmit = async () => {
    if (!booking) {
      setMessage("Please select a booking first.");
      return;
    }

    const accessToken = localStorage.getItem("sidni_access_token");
    if (!accessToken) {
      setMessage("Please log in before trying to pay.");
      navigate("/login");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      if (selectedMethod === "card") {
        const data = await createPaymentIntent(booking.id);
        setMessage(
          `Card checkout initialized. Client secret ready: ${data.client_secret ? "yes" : "no"}`,
        );
      } else if (selectedMethod === "mpesa") {
        const data = await createMpesaPayment({
          booking_id: booking.id,
          phone_number: `254${phoneNumber.replace(/\D/g, "")}`,
        });
        setMessage(
          `M-Pesa request sent. CheckoutRequestID: ${data.CheckoutRequestID || "pending"}`,
        );
      } else {
        setMessage(
          "PayPal checkout is ready for integration with your PayPal account.",
        );
      }
    } catch (error) {
      setMessage(error?.response?.data?.error || "Payment request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MainNavbar />

      <main className="payment-page">
        <section className="payment-layout">
          <div className="payment-panel payment-panel--checkout">
            <p className="section-kicker">Secure checkout</p>
            <h1>Complete your payment</h1>

            <div className="payment-methods">
              <button
                type="button"
                className={`payment-method ${selectedMethod === "card" ? "is-selected" : ""}`}
                onClick={() => setSelectedMethod("card")}
              >
                <FaCreditCard /> Card
              </button>
              <button
                type="button"
                className={`payment-method ${selectedMethod === "paypal" ? "is-selected" : ""}`}
                onClick={() => setSelectedMethod("paypal")}
              >
                <FaPaypal /> PayPal
              </button>
              <button
                type="button"
                className={`payment-method ${selectedMethod === "mpesa" ? "is-selected" : ""}`}
                onClick={() => setSelectedMethod("mpesa")}
              >
                <FaMobileAlt /> M-Pesa
              </button>
            </div>

            <div className="payment-brand-strip">
              {selectedMethod === "card" &&
                paymentBrandLogos.card.map((logo, index) => (
                  <div key={logo} className="payment-brand payment-brand--card">
                    <img src={logo} alt={`Card brand ${index + 1}`} />
                  </div>
                ))}

              {selectedMethod === "paypal" && (
                <div className="payment-brand payment-brand--paypal">
                  <img src={paymentBrandLogos.paypal} alt="PayPal" />
                </div>
              )}

              {selectedMethod === "mpesa" && (
                <div className="payment-brand payment-brand--mpesa">
                  <img src={paymentBrandLogos.mpesa} alt="M-Pesa" />
                </div>
              )}
            </div>

            <div className="payment-form-panel">
              {selectedMethod === "card" && (
                <div className="payment-form">
                  <div className="payment-form__row payment-form__row--two">
                    <label>
                      Cardholder name
                      <input type="text" value="Amina Njeri" readOnly />
                    </label>
                    <label>
                      Card type
                      <select defaultValue="Visa">
                        <option>Visa</option>
                        <option>Mastercard</option>
                        <option>American Express</option>
                      </select>
                    </label>
                  </div>

                  <label>
                    Card number
                    <input type="text" placeholder="1234 5678 9012 3456" />
                  </label>

                  <div className="payment-form__row payment-form__row--three">
                    <label>
                      Expiry
                      <input type="text" placeholder="MM/YY" />
                    </label>
                    <label>
                      CVV
                      <input type="password" placeholder="***" />
                    </label>
                    <label>
                      ZIP
                      <input type="text" placeholder="00100" />
                    </label>
                  </div>

                  <div className="payment-inline-check">
                    <input type="checkbox" defaultChecked />
                    <span>Send payment receipt to my email</span>
                  </div>

                  <div className="payment-box-warning">
                    <FaLock />
                    <span>
                      Your payment is protected with 256-bit encryption.
                    </span>
                  </div>

                  <Button
                    variant="primary"
                    className="payment-submit-btn"
                    onClick={handlePaymentSubmit}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Pay with Card"}
                  </Button>
                </div>
              )}

              {selectedMethod === "paypal" && (
                <div className="payment-form">
                  <label>
                    PayPal email
                    <input type="email" placeholder="you@example.com" />
                  </label>

                  <label>
                    PayPal account name
                    <input type="text" value="Amina Njeri" readOnly />
                  </label>

                  <div className="payment-inline-check">
                    <input type="checkbox" defaultChecked />
                    <span>Send payment receipt to my email</span>
                  </div>

                  <div className="payment-box-warning">
                    <FaLock />
                    <span>
                      You will be redirected to PayPal to complete the secure
                      checkout.
                    </span>
                  </div>

                  <Button
                    variant="primary"
                    className="payment-submit-btn"
                    onClick={handlePaymentSubmit}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Continue to PayPal"}
                  </Button>
                </div>
              )}

              {selectedMethod === "mpesa" && (
                <div className="payment-form">
                  <div className="mpesa-form">
                    <div className="mpesa-form__phone">
                      <select defaultValue="+254">
                        {countryCodes.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.country} ({country.code})
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        placeholder="712 345 678"
                        value={phoneNumber}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                      />
                    </div>

                    <div className="payment-inline-check">
                      <input type="checkbox" defaultChecked />
                      <span>Send payment receipt to my email</span>
                    </div>

                    <div className="payment-box-warning">
                      <FaLock />
                      <span>
                        M-Pesa payments are validated in real time for your
                        booking.
                      </span>
                    </div>

                    <Button
                      variant="primary"
                      className="payment-submit-btn"
                      onClick={handlePaymentSubmit}
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Pay via M-Pesa"}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {message && <p className="payment-box-warning">{message}</p>}
          </div>

          <aside className="payment-panel payment-panel--summary">
            <div className="summary-card">
              <p className="section-kicker section-kicker--light">
                Booking summary
              </p>
              <h2>{bookingSummary.title}</h2>

              <div className="summary-row">
                <span>Travelers</span>
                <strong>{bookingSummary.travelers}</strong>
              </div>

              <div className="summary-row">
                <span>Subtotal</span>
                <strong>${bookingSummary.subtotal.toFixed(2)}</strong>
              </div>

              <div className="summary-row">
                <span>Service fee</span>
                <strong>${bookingSummary.serviceFee.toFixed(2)}</strong>
              </div>

              <div className="summary-row">
                <span>Taxes</span>
                <strong>${bookingSummary.taxes.toFixed(2)}</strong>
              </div>

              <div className="summary-row summary-row--total">
                <span>Total</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </>
  );
}
