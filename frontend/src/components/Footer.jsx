import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left Section */}
        <div className="footer-brand">
          <h4>Symposium 2025 🚀</h4>
          <p>Innovate • Inspire • Integrate</p>
        </div>

        {/* Center Links */}
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#events">Events</a>
          <a href="#contact">Contact</a>
        </div>

        {/* Right Social */}
        <div className="footer-social">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-linkedin-in"></i></a>
        </div>

      </div>

      {/* Bottom Line */}
     <div className="footer-bottom">
  © 2025 Symposium | All Rights Reserved <br />
  Designed and Developed By <span className="des">Sam</span>
</div>

      {/* Back To Top Button */}
      <a href="#home" className="back-to-top">
        <i className="fas fa-arrow-up"></i>
      </a>
    </footer>
  );
}