import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import './footer.css';
import { Link } from 'react-router-dom';

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
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/products">Products</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-section">
          <h6>Support</h6>
          <Link to="/contact">Contact</Link>
          <Link to="/returns-and-refund">Refunds and Refund</Link>
          <Link to="/">FAQs</Link>
        </div>
        <div className="footer-section">
          <h6>Contact</h6>
          <a>0121 558 7137</a>
          <a>Regalia@gmail.com</a>
          <a>20 Aventure Park Ln.</a>
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
      <Link to="/privacy-policy">Privacy Policy</Link>
        <p>&copy; 2024 Regalia. All Rights Reserved</p>
        <div className="social-icons">
        <a href="https://facebook.com" className="social-icon"><FontAwesomeIcon icon={faFacebook} /></a>
        <a href="https://twitter.com" className="social-icon"><FontAwesomeIcon icon={faTwitter} /></a>
        <a href="https://instagram.com" className="social-icon"><FontAwesomeIcon icon={faInstagram} /></a>
        <a href="https://tiktok.com" className="social-icon"><FontAwesomeIcon icon={faTiktok} /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
