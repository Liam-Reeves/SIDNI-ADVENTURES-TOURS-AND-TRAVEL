import "./WhyUs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from '@fortawesome/free-solid-svg-icons';





function WhyUs() {
  const reasons = [
    {
      index: 1,
      icon: faLocationDot,
      title: "Expertise",
      description:
        "We have a team of experienced professionals who are dedicated to providing the best service.",
    },
    {
      index: 2,
      icon: faCheck,
      title: "Customer Satisfaction",
      description:
        "Our top priority is ensuring our customers are happy and satisfied with our services.",
    },
    {
      index: 3,
      icon: faCalendar,
      title: "Innovation",
      description:
        "We continuously innovate and improve our services to meet the evolving needs of our customers.",
    },
  ];
  return (
    <div className="why-us">
      <h2>Why Choose Us?</h2>
      <div className="reasons">
        {reasons.map((reason, index) => (
          <div className="reason" key={index}>
            <FontAwesomeIcon icon={reason.icon} className="icon" />
            <h3>{reason.title}</h3>
            <p>{reason.description}</p>
          </div>

        ))}
      </div>
    </div>
  );
}

export default WhyUs;
