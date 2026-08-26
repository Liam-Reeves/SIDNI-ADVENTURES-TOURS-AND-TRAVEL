import "./css/Gallery.css";
import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";
import zebrasImage from "../assets/pack-of-zebras.jpg";
import cheetahImage from "../assets/cheetah-on-tree.jpg";
import wildebeestImage from "../assets/5969.jpg";
import elephantImage from "../assets/elephant.jpg";
import lionsImage from "../assets/lions-1.jpg";
import savannahImage from "../assets/savannah-road.jpg";
import Col from 'react-bootstrap/Col';

import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';


export default function Gallery() {
  return (
    <>
      <MainNavbar />
      <main className="gallery_page">
        <div className="heading">
          <h1>Gallery</h1>
          <p>Explore our stories, destinations, and unforgettable moments.</p>
        </div>
        <div className="gallery_pics">
          <Row>
            <Col xs={6} md={4}>
              <Image src={zebrasImage} thumbnail />
            </Col>
            <Col xs={6} md={4}>
              <Image src={cheetahImage} thumbnail />
            </Col>
            <Col xs={6} md={4}>
              <Image src={wildebeestImage} thumbnail />
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={4}>
              <Image src={lionsImage} thumbnail />
            </Col>
            <Col xs={6} md={4}>
              <Image src={savannahImage} thumbnail />
            </Col>
            <Col xs={6} md={4}>
              <Image src={elephantImage} thumbnail />
            </Col>
          </Row>
        </div>
      </main>
      <Footer />
    </>
  );
}
