import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './Signup.css';
import Google from './assets/Icons/Google.svg';
import Instagram from './assets/Icons/Instagram.svg';
import Facebook from './assets/Icons/Facebook.svg';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreePrivacyPolicy: false,
    agreeTermsConditions: false,
  });

  const Input = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const Submit = (e) => {
    e.preventDefault();
    console.log('Signup form submitted:', formData);
  };

  return (
    <div className="signup-container">
      <div className="left-half">
        <div className="blue-background">
          <div className="regalia-text">
            <h1>Regalia</h1>
          </div>
          <div className="middle-text">
            <p>Responsibly</p>
            <p>crafted</p>
            <p>jewellery</p>
          </div>
          <div className="slogan">
            <p>True luxury in jewellery</p>
          </div>
        </div>
      </div>
      <div className="right-half">
        <h1>Create Your Account</h1>
        <p>
          Already have an account? <a href="/login">Log in</a>
        </p>

        <div className="social-buttons">
          <p>Sign up with</p>
          <button>
            <img src={Google} alt="Google" />
          </button>
          <button>
            <img src={Instagram} alt="Instagram" />
          </button>
          <button>
            <img src={Facebook} alt="Facebook" />
          </button>
        </div>

        <p>OR</p>

        <form onSubmit={Submit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={Input}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={Input}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={Input}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={Input}
              required
            />
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="agreePrivacyPolicy"
              name="agreePrivacyPolicy"
              checked={formData.agreePrivacyPolicy}
              onChange={Input}
              required
            />
            <label htmlFor="agreePrivacyPolicy">
              I agree to the <a href="/privacy-policy">Privacy Policy</a>
            </label>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="agreeTermsConditions"
              name="agreeTermsConditions"
              checked={formData.agreeTermsConditions}
              onChange={Input}
              required
            />
            <label htmlFor="agreeTermsConditions">
              I agree to the <a href="/terms-conditions">Terms and Conditions</a>
            </label>
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Signup />
  </React.StrictMode>
);

export default Signup;