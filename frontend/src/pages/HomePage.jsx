import "./css/HomePage.css";
import HeroCarousel from "../components/HeroCarousel";
import WhyUs from "../components/WhyUs";
import {  Container } from "react-bootstrap";
import FeaturedCards from "../components/FeaturedCards";
import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";



export default function HomePage() {
  return (
    <>
      <MainNavbar />
      <main className="home-page">
        <Container fluid className="p-0">
          <HeroCarousel />
          <h1 className="text-center my-4">Featured Tours</h1>
          <FeaturedCards />
          <WhyUs />
          <Testimonials />
          <Footer />
        </Container>
      </main>
    </>
  );
}
