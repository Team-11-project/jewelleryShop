import React, { useState } from 'react';
import './forgotPassword.css';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const notify = (message) => { toast(message) }

  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(0)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/auth/sendResetCode/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = await response.json()

      if (res.status == 200) {
        notify('Email link sent successfully');
        // const res = await response.json()
        // setUserId(response.response)
        // console.log(res.response.userId)
        redirectToResetPassword(res.response.userId);
      } else {
        notify('Failed to send email link, check email');
      }
    } catch (error) {
      console.error('Error sending email link:', error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const redirectToResetPassword = (id) => {
    navigate('/ResetPassword', { state: { userId: id } })
    // window.location.href = '/ResetPassword';
  };

  const handleBackButtonClick = () => {
    navigate('/');
  };

  return (
    <div className="forgot-password-page">
      <div className="email-confirmation-card">
        <div className="back-button" onClick={handleBackButtonClick}>← Back</div>
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