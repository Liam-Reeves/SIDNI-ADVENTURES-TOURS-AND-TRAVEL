import { useEffect, useRef } from "react";
import { Container, Card } from "react-bootstrap";
import "./Testimonials.css";

const testimonials = [
  {
    name: "Aisha Omar",
    role: "Adventure Seeker",
    text: "Sidni Adventures turned our weekend into an unforgettable journey — seamless planning, stunning guides, and real local flavor.",
  },
  {
    name: "Daniel Weber",
    role: "Photographer",
    text: "Excellent routes, great support and the vistas were out of this world. Highly recommend for anyone who loves nature.",
  },
  {
    name: "Maria Gonzalez",
    role: "Family Traveler",
    text: "Kid-friendly, safe, and so much fun. The team went above and beyond to make our trip special.",
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      },
    );

    const cards = section.querySelectorAll(".testimonial-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="testimonials"
      aria-label="Testimonials"
      ref={sectionRef}
    >
      <Container className="testimonials-container">
        <h2 className="testimonials-title">What Our Travelers Say</h2>

        <div className="testimonials-grid" role="list">
          {testimonials.map((t, i) => (
            <Card className="testimonial-card" key={i} role="listitem">
              <Card.Body>
                <div className="testimonial-top">
                  <div className="meta">
                    <h5 className="name">{t.name}</h5>
                    <p className="role">{t.role}</p>
                    <p className="text">{t.text}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
