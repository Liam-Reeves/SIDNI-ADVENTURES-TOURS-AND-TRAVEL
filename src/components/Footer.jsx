import Container from "react-bootstrap/Container";

export default function Footer() {
  return (
    <footer className="bg-light py-3 mt-5">
      <Container>
        <small>
          © {new Date().getFullYear()} Sidni Adventures. All rights reserved.
        </small>
      </Container>
    </footer>
  );
}
