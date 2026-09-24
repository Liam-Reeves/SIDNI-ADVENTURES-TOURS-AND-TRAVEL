import "./css/Booking.css";
import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaStar, FaUsers } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import {
  createBooking,
  fetchMyBookings,
  fetchTourAvailabilities,
} from "../api";

export default function Booking() {
  const [bookingEntries, setBookingEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTour] = useState(() => {
    try {
      const savedTour = localStorage.getItem("sidni_selected_tour");
      return savedTour ? JSON.parse(savedTour) : null;
    } catch {
      return null;
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadBookings = async () => {
      const token = localStorage.getItem("sidni_access_token");

      if (!token) {
        setBookingEntries([]);
        setLoading(false);
        return;
      }

      try {
        const data = await fetchMyBookings();
        setBookingEntries(data);

        if (data.length === 0 && selectedTour) {
          const availabilities = await fetchTourAvailabilities(selectedTour.id);
          const firstAvailable = availabilities.find(
            (slot) => Number(slot.slots_available) > 0,
          );

          if (firstAvailable) {
            const createdBooking = await createBooking({
              availability_id: firstAvailable.id,
              number_of_people: 1,
            });

            setBookingEntries((current) => [createdBooking, ...current]);
            localStorage.setItem(
              "sidni_selected_booking",
              JSON.stringify(createdBooking),
            );
          }
        }
      } catch (error) {
        const status = error?.response?.status;

        if (status === 401) {
          localStorage.removeItem("sidni_access_token");
          localStorage.removeItem("sidni_refresh_token");
          navigate("/tourlistings");
          return;
        }

        console.error("Could not load bookings:", error);
        setBookingEntries([]);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [navigate, selectedTour]);

  const totalAmount = useMemo(
    () =>
      bookingEntries.reduce(
        (sum, booking) => sum + Number(booking.total_amount || 0),
        0,
      ),
    [bookingEntries],
  );

  return (
    <>
      <MainNavbar />

      <main className="booking-page">
        <section className="booking-page__header">
          <div>
            <p className="section-kicker">Your upcoming plans</p>
            <h1>My bookings</h1>
          </div>
          <div className="booking-page__summary">
            <span>Total</span>
            <strong>KES {totalAmount}</strong>
          </div>
        </section>

        <section className="booking-list">
          {loading ? (
            <div className="tour-listings-empty">
              <h2>Loading bookings...</h2>
            </div>
          ) : bookingEntries.length > 0 ? (
            bookingEntries.map((booking) => {
              const tourTitle = booking.tour_title || "Booked adventure";
              const location = booking.location || "Kenya";
              const image =
                booking.image ||
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80";
              const travelers = booking.number_of_people || 1;
              const status = booking.status || "Pending";

              return (
                <article key={booking.id} className="booking-card">
                  <img
                    src={image}
                    alt={tourTitle}
                    className="booking-card__image"
                  />

                  <div className="booking-card__content">
                    <div className="booking-card__top-row">
                      <div>
                        <p className="booking-card__location">
                          <FaMapMarkerAlt /> {location}
                        </p>
                        <h2>{tourTitle}</h2>
                      </div>
                      <span
                        className={`booking-status booking-status--${status.toLowerCase()}`}
                      >
                        {status}
                      </span>
                    </div>

                    <div className="booking-card__meta">
                      <span>
                        <FaStar /> 4.9
                      </span>
                      <span>
                        <FaUsers /> {travelers} travelers
                      </span>
                      <span>
                        {booking.created_at
                          ? new Date(booking.created_at).toLocaleDateString()
                          : "Today"}
                      </span>
                    </div>

                    <div className="booking-card__bottom-row">
                      <div>
                        <p className="booking-card__label">Trip value</p>
                        <strong>KES {Number(booking.total_amount || 0)}</strong>
                      </div>
                      <Button
                        as={Link}
                        to="/payment"
                        variant="primary"
                        className="booking-card__action"
                        onClick={() => {
                          localStorage.setItem(
                            "sidni_selected_booking",
                            JSON.stringify(booking),
                          );
                        }}
                      >
                        Checkout
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="tour-listings-empty">
              <h2>No bookings yet</h2>
              <p>Book a tour to see it appear here.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
