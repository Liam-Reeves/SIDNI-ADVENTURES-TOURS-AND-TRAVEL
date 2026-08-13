import "./css/TourListings.css";

import { useMemo, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaFilter, FaCompass } from "react-icons/fa";

import TourListingCard from "../components/TourListingCard";
import { tours } from "../data/tour";



export default function TourListings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const categories = [
    "All",
    "Featured",
    "Popular",
    "New",
    "Best Seller",
    "Premium",
    "Scenic",
  ];

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const matchesSearch =
        tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || tour.badge === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handlePlanTrip = () => {
    const destinationTour = filteredTours[0] ?? tours[0];
    navigate(`/tourdetails/${destinationTour.id}`);
  };

  return (
    <main className="tour-listings-page">
      <section className="tour-listings-hero">
        <div className="tour-listings-hero__content">
          <p className="tour-listings-hero__eyebrow">
            <FaCompass /> Discover unforgettable journeys
          </p>
          <h1>Find your next adventure in Kenya.</h1>
          <p className="tour-listings-hero__text">
            Browse curated safari escapes, coastal getaways, and scenic
            expeditions crafted for every traveler.
          </p>
        </div>
      </section>

      <section className="tour-listings-controls" aria-label="Tour filters">
        <div className="tour-listings-controls__search">
          <FaSearch />
          <Form.Control
            type="text"
            placeholder="Search by destination or tour"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="tour-listings-controls__filter">
          <FaFilter />
          <Form.Select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </div>

        <Button
          className="tour-listings-controls__button"
          onClick={handlePlanTrip}
        >
          Plan my trip
        </Button>
      </section>

      <section className="tour-listings-grid" aria-label="Available tours">
        {filteredTours.length > 0 ? (
          filteredTours.map((tour) => (
            <TourListingCard key={tour.id} tour={tour} />
          ))
        ) : (
          <div className="tour-listings-empty">
            <h2>No tours match your search</h2>
            <p>
              Try a different keyword or category to reveal more experiences.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
