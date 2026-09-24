import "./FeaturedCards.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTours } from "../api";

function FeaturedCards() {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTours()
      .then((data) => setTours(data.slice(0, 6)))
      .catch((error) => console.error("Could not load featured tours:", error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div className="featured-cards__state">Loading featured tours...</div>;
  }

  if (tours.length === 0) {
    return <div className="featured-cards__state">Featured tours are unavailable right now.</div>;
  }

  return (
    <div className="featured-cards">
      {tours.map((tour) => (
        <Card className="featured-card" key={tour.id}>
          <div className="card-image-wrapper">
            <Card.Img variant="top" src={tour.image} alt={tour.title} />
            <span className="card-badge">{tour.badge}</span>
          </div>
          <Card.Body className="card-body">
            <div className="card-meta">
              <span>{tour.duration}</span>
              <span>{tour.groupSize}</span>
            </div>
            <Card.Title className="title">{tour.title}</Card.Title>
            <Card.Text className="description">{tour.description}</Card.Text>
            <div className="card-footer">
              <div className="price">From KES {tour.price}</div>
              <Button
                variant="primary"
                className="button"
                onClick={() => navigate(`/tourdetails/${tour.id}`)}
              >
                Explore →
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default FeaturedCards;
