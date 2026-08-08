import Carousel from "react-bootstrap/Carousel";
import elephantImage from "../assets/elephant.jpg";
import lionImage from "../assets/lions-1.jpg";
import horizonNatureImage from "../assets/horizon-nature.jpg";
import "./HeroCarousel.css";

function HeroCarousel() {
  return (
    <Carousel fade>
      <Carousel.Item className="carousel-item">
        <img className="hero-image" src={elephantImage} alt="First slide" />
        <Carousel.Caption className="carousel-caption">
          <h3 className="carousel-title">Explore the Vast Safari</h3>
          <p className="carousel-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        <img className="hero-image" src={lionImage} alt="Second slide" />
        <Carousel.Caption className="carousel-caption">
          <h3 className="carousel-title">Exquisuite Travel Experience</h3>
          <p className="carousel-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        <img
          className="hero-image"
          src={horizonNatureImage}
          alt="Third slide"
        />
        <Carousel.Caption className="carousel-caption">
          <h3 className="carousel-title">Unforgettable Adventures</h3>
          <p className="carousel-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            ratione perspiciatis autem quis, aliquid incidunt exercitationem
            neque et at, harum impedit temporibus ab quibusdam cum vero esse
            provident veritatis maiores?
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HeroCarousel;
