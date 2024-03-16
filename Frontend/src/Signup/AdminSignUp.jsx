import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';
import Google from '../assets/Icons/Google.svg';
import Instagram from '../assets/Icons/Instagram.svg';
import Facebook from '../assets/Icons/Facebook.svg';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password1: '',
    password2: '',
    role: 'admin',
    // agreePrivacyPolicy: false,
    // agreeTermsConditions: false,
  });

  const Input = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const Submit = async (e) => {
    e.preventDefault()
    try {
      //console.log("trying signup")
      const response = await fetch('http://localhost:3001/auth/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });


      // console.log("next point")

      const res = await response.json()
      if (res.status == 200) {
        //console.log(res.status)
        alert('Signup complete');
        window.location.href = "/Login";

      } else {
        // const errorData = await response.json();
        alert('Signup incomplete');
      }
    } catch (error) {
      //console.log('Signup Error:', error);
      // setError('Error during signup.');
    }
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
        <h6>Are you a customer? <a href="/Signup">Sign up</a></h6>
        <h1 className="create-account-heading">Create Your Account</h1>
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
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => { setFormData({ ...formData, firstName: e.target.value }) }}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => { setFormData({ ...formData, lastName: e.target.value }) }}
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
            <label htmlFor="password1">Password</label>
            <input
              type="password"
              id="password1"
              name="password1"
              value={formData.password1}
              onChange={Input}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={formData.password2}
              onChange={Input}
              required
            />
          </div>

          {/* <div className="form-group">
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
          </div>  */}

          {/* <div className="form-group">
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
          </div> */}

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;