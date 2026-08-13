import "./css/TourDetails.css";

import Button from "react-bootstrap/Button";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaStar,
  FaUsers,
} from "react-icons/fa";

import { tours } from "./TourListings";

export default function TourDetails() {
  const { tourId } = useParams();
  const selectedTour =
    tours.find((tour) => String(tour.id) === String(tourId)) ?? tours[0];

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
      <div className="tour-details__back-row">
        <Button
          as={Link}
          to="/tourlistings"
          variant="outline-secondary"
          className="tour-details__back-button"
        >
          <FaArrowLeft /> Back to tours
        </Button>
      </div>

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
            From <strong>${selectedTour.price}</strong> / person
          </p>

          <p className="tour-details__overview">{selectedTour.overview}</p>

          <div className="tour-details__actions">
            <Button variant="primary" className="tour-details__primary-action">
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
    </main>
  );
}
