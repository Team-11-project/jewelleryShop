import React from 'react';
import './forgotPassword.css'; 

const ForgotPassword = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="forgot-password-page">
      <div className="email-confirmation-card">
        <div className="back-button">← Back</div>
        <div className="email-form-container">
          <h1 className="email-confirmation-title">Confirm your email</h1>
          <form onSubmit={handleSubmit} className="email-form">
            <label htmlFor="email" className="email-label">Email</label>
            <input type="email" id="email" className="email-input" />
            <div className="email-additional-text">Enter the email you signed up with</div>
            <button type="submit" className="send-link-button">Send link</button>
          </form>

        </div>
      </div>
      <div className="brand-story-card">
  <div className="brand-title">Regalia</div>
  <div className="brand-slogan">
    <p>Responsibly</p>
    <p>crafted</p>
    <p>jewellery</p>
  </div>
  <p className="brand-tagline">Adorn your story</p>
</div>
    </div>
  );
};

export default ForgotPassword;
