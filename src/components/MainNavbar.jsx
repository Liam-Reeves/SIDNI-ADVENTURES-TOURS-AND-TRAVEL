import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "./MainNavbar.css";
import logo from "../assets/lodge_logo.png";

function MainNavbar() {
  return (
    <Navbar
      expand="md"
      className="main-navbar bg-body-tertiary"
      collapseOnSelect
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          <img src={logo} alt="Sidni Adventures Logo" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="nav-toggle"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto custom-nav">
            <Nav.Link as={Link} to="/">
              Home.
            </Nav.Link>
            <Nav.Link as={Link} to="/aboutus">
              About Us.
            </Nav.Link>
            <Nav.Link as={Link} to="/tourlistings">
              Destinations.
            </Nav.Link>
            <Nav.Link as={Link} to="/gallery">
              Gallery.
            </Nav.Link>
            <Nav.Link as={Link} to="/blog">
              Blog.
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/login">
                Login
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/register">
                Register
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
