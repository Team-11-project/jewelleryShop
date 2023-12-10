import React from 'react';
import './checkout.css';
import diamondRingImg from './signatureRing.png';
import silverNecklaceImg from './silverNecklace.png';

const countries = [
    "Australia", "Austria", "Belgium", "Canada", "Croatia", "France",
    "Germany", "Italy", "Netherlands", "Portugal", "Poland", "Russia", "Spain",
    "Sweden", "Switzerland", "Turkey", "United Kingdom", "United States"
  
];


const Checkout = () => {
  const goBack = () => {
    window.history.back();
  };
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
        <div className="order-summary-item">
          <img src={diamondRingImg} alt="Signature pear diamond ring" className="order-item-image" />
          <div>
            <p className="item-name">Signature pear diamond ring</p>
            <p className="item-details">Size: M, Qty: 1</p>
            <p className="item-price">£10,000</p>
          </div>
        </div>
        <div className="order-summary-item">
          <img src={silverNecklaceImg} alt="Silver necklace" className="order-item-image" />
          <div>
            <p className="item-name">Silver necklace</p>
            <p className="item-details">Size: S, Qty: 1</p>
            <p className="item-price"> £5,445</p>
          </div>
        </div>
            <div className="subtotal-row">
                <span className="amount-label">Subtotal:</span>
                <span className="amount-value">£15,445</span>
            </div>
            <div className="shipping-row">
                <span className="amount-label">Shipping:</span>
                <span className="amount-value">£4.99</span>
            </div>
            <div className="total-row">
                <span className="amount-label">TOTAL:</span>
                <span className="amount-value">£15,449.99</span>
            </div>
            <button className="checkout-button">Checkout</button>
          </div>
        </div>
      </div>
    );
};

export default Checkout;
