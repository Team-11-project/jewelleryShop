import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './footer.css'; 

function Footer() {
  return (
    <footer className="footer-custom">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>&copy;2023 Regalia. All Rights Reserved</p>
          </div>
          <div className="col-md-6 social-icons">
            <a href="#" className="social-icon"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="#" className="social-icon"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#" className="social-icon"><FontAwesomeIcon icon={faInstagram} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
