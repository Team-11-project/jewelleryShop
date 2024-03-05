import React, { useState } from 'react';
import './resetPassword.css';

const ResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password1 === '' || password2 === '') {
      setError('Please fill in all password fields');
      return;
    }

    if (password1 !== password2) {
      setError('Passwords do not match');
      return;
    }

    const userId = window.location.pathname.split('/')[2];

    try {
      const response = await fetch(`http://localhost:3001/auth/resetPassword/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp, password1, password2 }),
      });

      if (!response.ok) {
        let responseData = {};
        if (response.headers.get('content-type').includes('application/json')) {
          responseData = await response.json();
        }

        setError(responseData.message || 'An error occurred while resetting the password');
        return;
      } else {
        console.log('Password reset successful');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('An error occurred while resetting the password');
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-card">
        <div className="back-button">← Back</div>
        <div className="reset-form-container">
          <h1 className="reset-password-title">Reset Password</h1>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit} className="reset-form">
            <label htmlFor="otp" className="reset-label">Enter OTP</label>
            <input 
              type="text" 
              id="otp" 
              className="reset-input" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
            />
            <label htmlFor="password1" className="reset-label">New Password</label>
            <input 
              type="password" 
              id="password1" 
              className="reset-input" 
              value={password1} 
              onChange={(e) => setPassword1(e.target.value)} 
            />
            <label htmlFor="password2" className="reset-label">Confirm New Password</label>
            <input 
              type="password" 
              id="password2" 
              className="reset-input" 
              value={password2} 
              onChange={(e) => setPassword2(e.target.value)} 
            />
            <button type="submit" className="reset-button">Reset Password</button>
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

export default ResetPassword;