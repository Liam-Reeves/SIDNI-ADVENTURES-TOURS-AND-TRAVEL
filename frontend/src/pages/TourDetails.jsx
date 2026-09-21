import "./css/TourDetails.css";
import Footer from "../components/Footer";
import MainNavbar from "../components/MainNavbar";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaStar,
  FaUsers,
} from "react-icons/fa";
import { useEffect, useState } from "react";

import { fetchTourById } from "../api";

export default function TourDetails() {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const [selectedTour, setSelectedTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTour = async () => {
      try {
        const tour = await fetchTourById(tourId);
        setSelectedTour(tour);
      } catch (error) {
        console.error("Could not load tour:", error);
        setSelectedTour(null);
      } finally {
        setLoading(false);
      }
    };

    loadTour();
  }, [tourId]);

  const handleBookNow = () => {
    if (!selectedTour) return;
    localStorage.setItem("sidni_selected_tour", JSON.stringify(selectedTour));
    navigate("/booking");
  };

  if (loading) {
    return (
      <main className="tour-details tour-details--empty">
        <h1>Loading tour...</h1>
      </main>
    );
  }

  if (!selectedTour) {
    return (
      <main className="tour-details tour-details--empty">
        <h1>Tour not found</h1>
        <p>The selected tour could not be loaded.</p>
        <Button as={Link} to="/tourlistings" variant="primary">
          Back to tours
        </Button>
      </main>
    );
  }

  return (
    <main className="tour-details">
      <MainNavbar />
      <section className="tour-details__hero">
        <div className="tour-details__image-wrap">
          <img
            src={selectedTour.image}
            alt={selectedTour.title}
            className="tour-details__image"
          />
          <span className="tour-details__badge">{selectedTour.badge}</span>
        </div>

        <div className="tour-details__content">
          <p className="tour-details__location">
            <FaMapMarkerAlt /> {selectedTour.location}
          </p>
          <h1>{selectedTour.title}</h1>

          <div className="tour-details__meta">
            <span>
              <FaStar /> {selectedTour.rating}
            </span>
            <span>
              <FaClock /> {selectedTour.duration}
            </span>
            <span>
              <FaUsers /> {selectedTour.groupSize}
            </span>
          </div>

          <p className="tour-details__price">
            From <strong>KES{selectedTour.price}</strong> / person
          </p>

          <p className="tour-details__overview">{selectedTour.overview}</p>

          <div className="tour-details__actions">
            <Button
              variant="primary"
              className="tour-details__primary-action"
              onClick={handleBookNow}
            >
              Book this adventure
            </Button>
            <Button variant="outline-primary" as={Link} to="/tourlistings">
              Explore more tours
            </Button>
          </div>
        </div>
      </section>

      <section className="tour-details__info-grid">
        <div className="tour-details__panel">
          <h2>Why travelers love it</h2>
          <ul>
            {selectedTour.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="tour-details__panel">
          <h2>What’s included</h2>
          <ul>
            {selectedTour.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tour-details__panel tour-details__panel--wide">
        <h2>
          <FaCalendarAlt /> Suggested itinerary
        </h2>
        <ol>
          {selectedTour.itinerary.map((step, index) => (
            <li key={`${selectedTour.id}-${index}`}>{step}</li>
          ))}
        </ol>
      </section>
      <Footer />
    </main>
  );
}
