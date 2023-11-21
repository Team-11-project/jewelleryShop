import React from 'react';
import './forgotPassword.css'; // Make sure to link your CSS file

const ForgotPassword = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementation of what happens when the form is submitted
  };

  return (
    <div className="forgot-password-page">
      <div className="email-confirmation-card">
        <div className="back-button">← Back</div>
        <div className="email-form-container">
          <h1 className="email-confirmation-title">Confirm your email</h1>
          <form onSubmit={handleSubmit} className="email-form">
            <label htmlFor="email" className="email-label">Email</label>
            <input type="email" id="email" className="email-input" placeholder="Enter the email you signed up with" />
            <button type="submit" className="send-link-button">Send link</button>
          </form>
        </div>
      </div>
      <div className="brand-story-card">
        <h1 className="brand-title">Regalia</h1>
        <p className="brand-slogan">Responsibly crafted jewellery</p>
        <p className="brand-tagline">Adorn your story</p>
      </div>
    </div>
  );
};

export default ForgotPassword;
