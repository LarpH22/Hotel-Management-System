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
          <input type="email" placeholder="Enter your email" aria-label="Email for newsletter" />
          <button type="button" onClick={() => alert('Thanks! Newsletter sign-up is simulated in this demo.')}>→</button>
        </div>
        <div className="social-row">
          <button type="button" aria-label="Facebook">F</button>
          <button type="button" aria-label="Twitter">T</button>
          <button type="button" aria-label="LinkedIn">L</button>
          <button type="button" aria-label="YouTube">Y</button>
        </div>
      </div>
    </footer>
  );
}
