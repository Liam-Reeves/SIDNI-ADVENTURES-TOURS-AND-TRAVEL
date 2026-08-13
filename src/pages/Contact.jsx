import "./css/Contact.css";
import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";
export default function Contact() {
  return (
    <main className="contact-page">
      <MainNavbar/>
      <section className="contact-hero">
        <div className="contact-hero__content">
          <p className="contact-hero__eyebrow">Let’s plan your next escape</p>
          <h1>Contact Sidni Adventures</h1>
          <p>
            Whether you’re dreaming of a safari, a coastal retreat, or a private
            custom itinerary, our travel team is ready to help.
          </p>
        </div>
      </section>

      <section className="contact-layout">
        <div className="contact-details">
          <div className="contact-card">
            <h2>Ask us anything</h2>
            <ul>
              <li>
                <span>Email</span>
                <strong>hello@sidniadventures.com</strong>
              </li>
              <li>
                <span>Phone</span>
                <strong>+254 700 123 456</strong>
              </li>
              <li>
                <span>Location</span>
                <strong>Nairobi, Kenya</strong>
              </li>
            </ul>
          </div>

          <div className="contact-card contact-card--highlight">
            <h2>Office hours</h2>
            <p>Monday – Saturday</p>
            <p>8:00 AM – 6:00 PM</p>
            <p>Sunday: By appointment</p>
          </div>
        </div>

        <form className="contact-form">
          <div className="contact-form__grid">
            <label>
              Full name
              <input type="text" placeholder="Your name" />
            </label>

            <label>
              Email address
              <input type="email" placeholder="you@example.com" />
            </label>

            <label>
              Phone number
              <input type="tel" placeholder="+254 ..." />
            </label>

            <label>
              Trip type
              <select defaultValue="">
                <option value="" disabled>
                  Select an option
                </option>
                <option value="safari">Safari</option>
                <option value="beach">Beach getaway</option>
                <option value="family">Family holiday</option>
                <option value="custom">Custom itinerary</option>
              </select>
            </label>
          </div>

          <label>
            Your message
            <textarea rows="5" placeholder="Tell us about your dream trip..." />
          </label>

          <button type="submit" className="contact-form__button">
            Send inquiry
          </button>
        </form>
      </section>
      <Footer/>
    </main>
  );
}
