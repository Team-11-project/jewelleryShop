import React from 'react';
import './checkout.css';
import diamondRingImg from './signatureRing.png';
import silverNecklaceImg from './silverNecklace.png';
import { useLocation } from 'react-router';
import CheckoutBox from './checkoutBox';
import { Link } from 'react-router-dom';

const countries = [
    "Australia", "Austria", "Belgium", "Canada", "Croatia", "France",
    "Germany", "Italy", "Netherlands", "Portugal", "Poland", "Russia", "Spain",
    "Sweden", "Switzerland", "Turkey", "United Kingdom", "United States"
  
];


const Checkout = () => {
  const location = useLocation()
  const Cart = location.state
  console.log(Cart)
  const goBack = () => {
    window.history.back();
  };

  const subtotal = Cart ? Cart.reduce((acc, item) => acc + parseFloat(item.price), 0) : 0;
  const formattedSubtotal = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(subtotal);
  const total = subtotal+34.99
  const formattedTotal = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(total);
    return (
      <div className="checkout-container">
        <button onClick={goBack} className="back-button">← Back</button>
        <h1 className="checkout-title">CHECKOUT</h1>
        <div className="checkout-columns">
          <div className="checkout-column">
            <h2 className="section-title">Shipping Details</h2>
            <label className="input-label">Full Name</label>
            <input className="input-field" type="text" placeholder="First name and surname" />
            <label className="input-label">Address</label>
            <input className="input-field" type="text" placeholder="" />
            <div className="input-row">
              <div className="input-group">
                <label className="input-label">Country</label>
                <select className="input-field input-field-small">
                  {countries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">City/Town</label>
                <input className="input-field input-field-small" type="text" placeholder="" />
              </div>
              <div className="input-group">
                <label className="input-label">Postcode</label>
                <input className="input-field input-field-small" type="text" placeholder="" />
              </div>
            </div>
            <h2 className="section-title">Payment Details</h2>
            <label className="input-label">Cardholder's Name</label>
            <input className="input-field" type="text" placeholder="" maxLength="100" />
            <label className="input-label">Card Number</label>
            <input className="input-field" type="text" inputMode="numeric" pattern="\d*" maxLength="16" placeholder="1234 5678 9012 3456" />
            <div className="input-row payment-input-row">
              <div className="input-group">
                <label className="input-label">Expiry Date</label>
                <input className="input-field input-field-small" type="month" />
              </div>
              <div className="input-group">
                <label className="input-label">CVC/CVV</label>
                <input className="input-field input-field-small" type="text" inputMode="numeric" pattern="\d*" maxLength="4" placeholder="123" />
              </div>
            </div>
          </div>
          <div className="checkout-column">
          <div className="column-header">Order Details</div>
          {Cart && (
                    <>
                        <div className="">
                            {Cart.map(item => (
                                <CheckoutBox key={item.productId} item={item}/>
                            ))}
                        </div>
                    </>
                )}
        
            <div className="subtotal-row">
                <span className="amount-label">Subtotal:</span>
                <span className="amount-value">{formattedSubtotal}</span>
            </div>
            <div className="shipping-row">
                <span className="amount-label">Shipping:</span>
                <span className="amount-value">£34.99</span>
            </div>
            <div className="total-row">
                <span className="amount-label">TOTAL:</span>
                <span className="amount-value">{formattedTotal}</span>
            </div>
            <Link to="/checkoutComplete">
              <button className="checkout-button">Checkout</button>
            </Link>
            
          </div>
        </div>
      </div>
    );
};

export default Checkout;
