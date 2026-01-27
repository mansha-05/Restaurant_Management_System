import { FaAward, FaClock, FaStar } from "react-icons/fa";
import "./FeatureSection.css"
export default function Features() {
  const features = [
    {
      icon: <FaAward size={28} color="#e76a3c" />,
      title: "Premium Quality",
      desc: "Only the finest ingredients in every dish",
    },
    {
      icon: <FaClock size={28} color="#e76a3c" />,
      title: "Fast Service",
      desc: "Quick preparation without compromising quality",
    },
    {
      icon: <FaStar size={28} color="#e76a3c" />,
      title: "5-Star Rated",
      desc: "Consistently rated excellent by our customers",
    },
  ];

  return (
    <section className="features">
      {features.map((item, idx) => (
        <div key={idx} className="feature-card">
          <div className="feature-icon">{item.icon}</div>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      ))}
    </section>
  );
}
