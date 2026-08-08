import "./css/HomePage.css";
import HeroCarousel from "../components/HeroCarousel";

import {  Container } from "react-bootstrap";
import FeaturedCards from "../components/FeaturedCards";
import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <MainNavbar />
      <main className="home-page">
        <Container fluid className="p-0">
          <HeroCarousel />
          <h1 className="text-center my-4">Featured Tours</h1>
          <FeaturedCards />
        </Container>
      </main>
      <Footer />
    </>
  );
}
