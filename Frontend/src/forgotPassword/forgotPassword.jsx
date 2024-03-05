import React, { useState } from 'react';
import './forgotPassword.css'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/auth/sendResetCode/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Email link sent successfully');
        redirectToResetPassword();
      } else {
        console.error('Failed to send email link');
      }
    } catch (error) {
      console.error('Error sending email link:', error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const redirectToResetPassword = () => {
    window.location.href = '/ResetPassword';
  };

  return (
    <div className="forgot-password-page">
      <div className="email-confirmation-card">
        <div className="back-button">← Back</div>
        <div className="email-form-container">
          <h1 className="email-confirmation-title">Confirm your email</h1>
          <form onSubmit={handleSubmit} className="email-form">
            <label htmlFor="email" className="email-label">Email</label>
            <input 
              type="email" 
              id="email" 
              className="email-input" 
              value={email} 
              onChange={handleEmailChange} 
            />
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