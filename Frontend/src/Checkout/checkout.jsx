import React from 'react';
import './checkout.css';
import diamondRingImg from './signatureRing.png';
import silverNecklaceImg from './silverNecklace.png';

    const CheckoutPage = () => {
        return (
          <div className="checkout-container">
            <h1 className="checkout-title">CHECKOUT</h1>
            <h2 className="shipping-title">Shipping Details</h2>
            <div className="checkout-columns">
              <div className="checkout-column">
                <label className="input-label">Full Name</label>
                <input className="input-field" type="text" />
                <label className="input-label">Address</label>
                <input className="input-field" type="text" />
                <div className="input-row">
                <div className="input-group">
                    <label className="input-label">Country</label>
                    <input className="input-field input-field-small" type="text" />
                </div>
                <div className="input-group">
                    <label className="input-label">City/Town</label>
                    <input className="input-field input-field-small" type="text" />
                </div>
                <div className="input-group">
                    <label className="input-label">Postcode</label>
                    <input className="input-field input-field-small" type="text" />
                </div>
                </div>
                <h2 className="payment-title">Payment Details</h2>
                <div className="checkout-column"></div>
                <label className="input-label">Cardholder's Name</label>
                <input className="input-field" type="text" />
                <label className="input-label">Card Number</label>
                <input className="input-field" type="text" />
                <div className="input-row payment-input-row">
                    <div className="input-group">
                        <label className="input-label">Expiry Date</label>
                        <input className="input-field input-field-small" type="text" />
                    </div>
                    <div className="input-group">
                        <label className="input-label">CVC/CVV</label>
                        <input className="input-field input-field-small" type="text" />
                    </div>
                 </div>
              </div>
              <div className="checkout-column">
        <div className="column-header">Order Details</div>
        <div className="checkout-column order-details"></div>
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

export default CheckoutPage;