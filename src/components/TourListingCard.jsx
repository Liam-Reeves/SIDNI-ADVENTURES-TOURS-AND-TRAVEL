import "./TourListingCard.css";

import Button from "react-bootstrap/Button";
import { FaClock, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

function TourListingCard({ tour }) {
  return (
    <article className="tour-card">
      <div className="tour-card__image-wrap">
        <img src={tour.image} alt={tour.title} className="tour-card__image" />
        <span className="tour-card__badge">{tour.badge}</span>
      </div>

      <div className="tour-card__content">
        <div className="tour-card__top">
          <div>
            <p className="tour-card__location">
              <FaMapMarkerAlt /> {tour.location}
            </p>
            <h3>{tour.title}</h3>
          </div>
          <span className="tour-card__rating">{tour.rating}</span>
        </div>

        <p className="tour-card__description">{tour.description}</p>

        <div className="tour-card__meta">
          <span>
            <FaClock /> {tour.duration}
          </span>
          <span>
            <FaUsers /> {tour.groupSize}
          </span>
        </div>

        <div className="tour-card__footer">
          <div>
            <p className="tour-card__price-label">From</p>
            <p className="tour-card__price">${tour.price}</p>
          </div>

          <Button variant="outline-light" className="tour-card__button">
            View tour <FiArrowRight />
          </Button>
        </div>
      </div>
    </article>
  );
}

export default TourListingCard;
