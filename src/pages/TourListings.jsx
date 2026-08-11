import "./css/TourListings.css";

import { useMemo, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaSearch, FaFilter, FaCompass } from "react-icons/fa";

import TourListingCard from "../components/TourListingCard";
import beachImage from "../assets/beach.jpg";
import cheetahImage from "../assets/cheetah-on-tree.jpg";
import wildebeestImage from "../assets/5969.jpg";
import elephantImage from "../assets/elephant.jpg";
import lionsImage from "../assets/lions-1.jpg";
import savannahImage from "../assets/savannah-road.jpg";

const tours = [
  {
    id: 1,
    title: "Golden Coast Escape",
    location: "Diani, Kenya",
    description:
      "Relax on pristine beaches, snorkel in coral gardens, and enjoy a laid-back coastal retreat.",
    duration: "3 days",
    groupSize: "8 people",
    price: 180,
    rating: "4.9",
    badge: "Featured",
    image: beachImage,
  },
  {
    id: 2,
    title: "Big Five Safari",
    location: "Masai Mara",
    description:
      "Follow the wildebeest migration and spot lions, rhinos, elephants, and buffalo in the wild.",
    duration: "5 days",
    groupSize: "6 people",
    price: 320,
    rating: "4.8",
    badge: "Popular",
    image: cheetahImage,
  },
  {
    id: 3,
    title: "Highland Adventure",
    location: "Aberdare Range",
    description:
      "Hike misty trails, discover hidden waterfalls, and camp under star-filled skies.",
    duration: "4 days",
    groupSize: "10 people",
    price: 240,
    rating: "4.7",
    badge: "New",
    image: wildebeestImage,
  },
  {
    id: 4,
    title: "Elephant Trails",
    location: "Amboseli",
    description:
      "Enjoy sunrise game drives and memorable encounters with elephants against Mount Kilimanjaro.",
    duration: "2 days",
    groupSize: "5 people",
    price: 150,
    rating: "4.9",
    badge: "Best Seller",
    image: elephantImage,
  },
  {
    id: 5,
    title: "Lion Pride Expedition",
    location: "Serengeti",
    description:
      "Experience dramatic plains, close wildlife sightings, and expert-led photography stops.",
    duration: "6 days",
    groupSize: "7 people",
    price: 410,
    rating: "5.0",
    badge: "Premium",
    image: lionsImage,
  },
  {
    id: 6,
    title: "Savannah Sunrise Drive",
    location: "Laikipia",
    description:
      "Watch the sunrise spill across grasslands and connect with Kenya’s most iconic landscapes.",
    duration: "1 day",
    groupSize: "4 people",
    price: 95,
    rating: "4.6",
    badge: "Scenic",
    image: savannahImage,
  },
];

export default function TourListings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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

        <Button className="tour-listings-controls__button">Plan my trip</Button>
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
