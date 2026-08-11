import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/lodge_logo.png";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <Container className="footer-inner">
        <Row className="footer-top">
          <Col md={4} className="footer-about">
            <div className="logo-wrap">
              <img src={logo} alt="Sidni Adventures" />
            </div>
            <p>
              Kenya Safari Adventures has all what adventure travellers need
              under one roof — hotel reservations, short excursions, camping and
              lodge safaris, mountaineering, beach holidays and transfers.
            </p>
          </Col>

          <Col md={2} className="footer-links">
            <h5>Our Services</h5>
            <ul>
              <li>Ticket Booking</li>
              <li>Car Rental</li>
              <li>Hotel Booking</li>
              <li>Wildlife Safaris</li>
              <li>Adventures</li>
            </ul>
          </Col>

          <Col md={3} className="footer-links">
            <h5>Explore</h5>
            <ul>
              <li>Kenya Safaris</li>
              <li>Tanzania Safaris</li>
              <li>Gorilla Trekking</li>
              <li>Mt. Kilimanjaro</li>
              <li>Beach Holidays</li>
            </ul>
          </Col>

          <Col md={3} className="footer-contact">
            <h5>Follow us</h5>
            <div className="socials">
              <a aria-label="facebook" href="#">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a aria-label="twitter" href="#">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a aria-label="linkedin" href="#">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a aria-label="instagram" href="#">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>

            <div className="address">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <div>
                Nairobi
                <br />
                Kenya
              </div>
            </div>

            <Button variant="light" className="map-btn">
              View Map →
            </Button>
          </Col>
        </Row>

        <Row className="footer-bottom">
          <Col md={6} className="copyright">
            Copyright © {new Date().getFullYear()} KENYA SAFARI ADVENTURES. All
            Rights Reserved.
          </Col>
          <Col md={6} className="bottom-links">
            <nav>
              <a href="#">Privacy</a>
              <a href="#">Policy</a>
              <a href="#">About Us</a>
              <a href="#">Support</a>
              <a href="#">FAQ</a>
              <a href="#">Blog</a>
            </nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
