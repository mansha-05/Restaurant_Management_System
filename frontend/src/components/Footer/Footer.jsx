import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>🍽 Food Nova</h2>
          <p>Experience culinary excellence. Fresh ingredients, authentic flavors, unforgettable dining.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="/home">Home</a>
          <a href="/home/menu">Menu</a>
          <a href="/home/reserve">Reserve</a>
          <a href="/home/orders">Orders</a>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>📍 Pune, India</p>
          <p><i className="fa-brands fa-github"></i><a href="https://github.com/mansha-05/Restaurant_Management_System">  Github Link</a> </p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Food Nova Restaurant. All rights reserved.
      </div>
    </footer>
  );
}