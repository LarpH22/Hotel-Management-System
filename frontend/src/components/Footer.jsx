export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="brand-lockup footer-lockup">
          <img className="brand-crest" src="/images/logo.png" alt="EUTELIA logo" />
        </div>
        <p>© 2024 Eutelia Hotel & Resort. All rights reserved.</p>
      </div>
      <div className="footer-column">
        <h3>Company</h3>
        <a href="#about">About Us</a>
        <a href="#contact">Contact Us</a>
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms & Conditions</a>
      </div>
      <div className="footer-column">
        <h3>Support</h3>
        <a href="#help">Help Center</a>
        <a href="#docs">Documentation</a>
        <a href="#status">System Status</a>
      </div>
      <div className="footer-column footer-newsletter">
        <h3>Stay Updated</h3>
        <p>Subscribe to get the latest updates and announcements.</p>
        <div className="newsletter-input">
          <input type="email" placeholder="Enter your email" />
          <button type="button">→</button>
        </div>
        <div className="social-row">
          <span>F</span>
          <span>T</span>
          <span>L</span>
          <span>Y</span>
        </div>
      </div>
    </footer>
  );
}
