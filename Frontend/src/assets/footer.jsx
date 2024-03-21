import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import './footer.css';

function Footer() {
  return (
    <footer className="footer-custom">
      <div className="footer-content">
        <div className="footer-section">
          <h1 id="logo">Regalia</h1>
          <p>Discover the epitome of elegance.</p>
        </div>
        <div className="footer-section">
          <h6>Pages</h6>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Best Sellers</a>
          <a href="#">Products</a>
        </div>
        <div className="footer-section">
          <h6>Support</h6>
          <a href="#">Contact Us</a>
          <a href="#">Refund Policy</a>
          <a href="#">Delivery</a>
          <a href="#">FAQs</a>
        </div>
        <div className="footer-section">
          <h6>Title</h6>
          <a href="#">Option 1</a>
          <a href="#">Option 1</a>
          <a href="#">Option 1</a>
        </div>
        <div className="footer-section newsletter">
          <h6>Subscribe to our Newsletter</h6>
          <p>Get tailored messages and deals.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email" />
            <button type="submit">Subscribe</button>
          </div>
        </div>
      </div>
      <hr className="footer-divider" />
      <div className="footer-bottom">
        <a href="/privacy-policy">Privacy Policy</a>
        <p>&copy; 2023 Regalia. All Rights Reserved</p>
        <div className="social-icons">
          <a href="#" className="social-icon"><FontAwesomeIcon icon={faFacebook} /></a>
          <a href="#" className="social-icon"><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="#" className="social-icon"><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="#" className="social-icon"><FontAwesomeIcon icon={faTiktok} /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
