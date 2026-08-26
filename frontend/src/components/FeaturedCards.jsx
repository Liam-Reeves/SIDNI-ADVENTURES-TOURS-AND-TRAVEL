import "./FeaturedCards.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

import beachImage from "../assets/beach.jpg";
import cheetahImage from "../assets/cheetah-on-tree.jpg";
import wildebeestImage from "../assets/5969.jpg";
import elephantImage from "../assets/elephant.jpg";
import lionsImage from "../assets/lions-1.jpg";
import savannahImage from "../assets/savannah-road.jpg";

function FeaturedCards() {
  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      image: beachImage,
      badge: "FEATURED",
      title: "Beach Escape",
      description:
        "Discover warm sands and relaxing ocean views with our premium beach tours.",
      meta: ["2 days", "8 people"],
      price: "$120",
    },
    {
      id: 2,
      image: cheetahImage,
      badge: "POPULAR",
      title: "Wildlife Safari",
      description:
        "Get up close with Africa’s most majestic predators in a guided safari.",
      meta: ["1 day", "6 people"],
      price: "$150",
    },
    {
      id: 3,
      image: wildebeestImage,
      badge: "NEW",
      title: "Migration Adventure",
      description:
        "Follow the great migration across iconic landscapes and river crossings.",
      meta: ["4 days", "10 people"],
      price: "$240",
    },
    {
      id: 4,
      image: elephantImage,
      badge: "BEST SELLER",
      title: "Elephant Encounters",
      description:
        "Experience gentle giants in their natural habitat with expert guides.",
      meta: ["3 days", "6 people"],
      price: "$180",
    },
    {
      id: 5,
      image: lionsImage,
      badge: "FEATURED",
      title: "Lion Pride Tour",
      description:
        "Witness lion prides thriving on the savanna during an exclusive tour.",
      meta: ["2 days", "5 people"],
      price: "$200",
    },
    {
      id: 6,
      image: savannahImage,
      badge: "SCENIC",
      title: "Scenic Safari Drive",
      description:
        "Travel across golden grasslands and capture unforgettable scenery.",
      meta: ["1 day", "4 people"],
      price: "$140",
    },
    {
      id: 1,
      image: beachImage,
      badge: "RELAX",
      title: "Sunset Retreat",
      description:
        "Relax at dusk with stunning sunset views and seaside comforts.",
      meta: ["2 days", "6 people"],
      price: "$110",
    },
    {
      id: 2,
      image: cheetahImage,
      badge: "ADVENTURE",
      title: "Predator Watch",
      description:
        "Track the fastest animals and learn about their hunting behavior.",
      meta: ["1 day", "4 people"],
      price: "$95",
    },
  ];

  return (
    <div className="featured-cards">
      {cards.map((card) => (
        <Card className="featured-card" key={`${card.title}-${card.id}`}>
          <div className="card-image-wrapper">
            <Card.Img variant="top" src={card.image} />
            <span className="card-badge">{card.badge}</span>
          </div>
          <Card.Body className="card-body">
            <div className="card-meta">
              <span>{card.meta[0]}</span>
              <span>{card.meta[1]}</span>
            </div>
            <Card.Title className="title">{card.title}</Card.Title>
            <Card.Text className="description">{card.description}</Card.Text>
            <div className="card-footer">
              <div className="price">From {card.price}</div>
              <Button
                variant="primary"
                className="button"
                onClick={() => navigate(`/tourdetails/${card.id}`)}
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
