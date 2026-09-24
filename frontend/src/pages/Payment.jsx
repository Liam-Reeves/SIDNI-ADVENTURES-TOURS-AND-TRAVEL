import "./css/Payment.css";
import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCreditCard,
  FaMobileAlt,
  FaPaypal,
  FaArrowRight,
} from "react-icons/fa";

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

const paymentMethods = [
  {
    id: "card",
    title: "Card payment",
    description: "Visa, Mastercard or American Express",
    icon: FaCreditCard,
    path: "/payment/card",
  },
  {
    id: "paypal",
    title: "PayPal",
    description: "Pay securely with your PayPal account",
    icon: FaPaypal,
    path: "/payment/paypal",
  },
  {
    id: "mpesa",
    title: "M-Pesa",
    description: "Receive an STK prompt on your phone",
    icon: FaMobileAlt,
    path: "/payment/mpesa",
  },
];

export default function Payment() {
  const item = getCheckoutItem();
  const navigate = useNavigate();
  const total = Number(item?.total_amount || 0).toFixed(2);

  return (
    <>
      <MainNavbar />
      <main className="payment-page payment-page--chooser">
        <section className="payment-chooser">
          <div className="payment-chooser__intro">
            <p className="section-kicker">Secure checkout</p>
            <h1>Choose how to pay</h1>
            <p>Select your preferred payment method to continue.</p>
          </div>
          <div className="payment-chooser__body">
            <div className="payment-chooser__methods">
              {paymentMethods.map(
                ({ id, title, description, icon: Icon, path }) => (
                  <Link
                    key={id}
                    to={path}
                    className={`payment-option payment-option--${id}`}
                  >
                    <span className="payment-option__icon">
                      <Icon />
                    </span>
                    <span className="payment-option__copy">
                      <strong>{title}</strong>
                      <small>{description}</small>
                    </span>
                    <FaArrowRight className="payment-option__arrow" />
                  </Link>
                ),
              )}
            </div>
            <aside className="payment-chooser__summary">
              <p className="section-kicker section-kicker--light">
                Your selection
              </p>
              <h2>{item?.tour_title || "Adventure booking"}</h2>
              <p>{item?.location || "Kenya"}</p>
              <div className="payment-summary-line">
                <span>Travelers</span>
                <strong>{item?.number_of_people || 1}</strong>
              </div>
              <div className="payment-summary-line payment-summary-line--total">
                <span>Total</span>
                <strong>KES {total}</strong>
              </div>
              {!item && (
                <button
                  type="button"
                  className="payment-summary-link"
                  onClick={() => navigate("/tourlistings")}
                >
                  Choose an adventure
                </button>
              )}
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
