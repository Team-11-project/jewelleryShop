import React, { useContext, useState } from 'react';
import './checkout.css';
import diamondRingImg from './signatureRing.png';
import silverNecklaceImg from './silverNecklace.png';
import { useLocation, useNavigate } from 'react-router';
import CheckoutBox from './checkoutBox';
import { Link } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

const countries = [
  "Australia", "Austria", "Belgium", "Canada", "Croatia", "France",
  "Germany", "Italy", "Netherlands", "Portugal", "Poland", "Russia", "Spain",
  "Sweden", "Switzerland", "Turkey", "United Kingdom", "United States"

];


const Checkout = () => {
  let { user } = useContext(AuthContext)
  let { authTokens } = useContext(AuthContext)
  const location = useLocation()
  const Cart = location.state

  const navigate = useNavigate()
  // console.log(Cart)
  const goBack = () => {
    window.history.back();
  };

  const subtotal = Cart ? Cart.reduce((acc, item) => acc + parseFloat(item.price), 0) : 0;
  const formattedSubtotal = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(subtotal);
  const total = subtotal + 34
  const formattedTotal = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(total);

  const removeAllFromCart = async () => {
    const userid = user?.user.id
    try {
      let response = await fetch(`http://localhost:3001/cart/removeAll/${userid}`,
        {
          method: "DELETE",
          headers: {
            // 'Content-Type': 'application/json',
          }
        },
      )
      console.log(response.json())
    } catch (error) {
      console.log(error)

    }
  }

  const [formData, setFormData] = useState({
    userId: user?.user.id,
    city: "",
    address: "",
    postcode: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    cardHolder: "",
    totalPrice: total,
  })

  const createOrder = async (e) => {
    // e.preventDefault()

    // const userid = user?.user.id
    const token = authTokens.token
    console.log(formData)

    try {
      console.log(formData)
      // let data = new FormData();
      // data.append('userId', formData.userId),
      //   data.append('city', formData.city),
      //   data.append('address', formData.address),
      //   data.append('postcode', formData.postcode),
      //   data.append('country', formData.country),
      //   data.append('cardNumber', formData.cardNumber),
      //   data.append('expiryDate', formData.expiryDate),
      //   data.append('cvc', formData.cvc),
      //   data.append('cardHolder', formData.cardHolder),
      //   data.append('totalPrice', formData.totalPrice)

      const req = await fetch(`http://localhost:3001/cart/createOrder`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      const res = await req.json();
      if (res.status === 200) {
        console.log(res)
        setTimeout(() => {
          navigate('/checkoutComplete')

        }, 2000);

      }
      else {
        console.log(res)
      }
    }
    catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="checkout-container">
      <button onClick={goBack} className="back-button">← Back</button>
      <h1 className="checkout-title">CHECKOUT</h1>
      <div className="checkout-columns">
        <div className="checkout-column">
          <h2 className="section-title">Shipping Details</h2>
          <label className="input-label">Full Name</label>
          <input
            className="input-field"
            type="text"
            placeholder="First name and surname"
          />
          <label className="input-label">Address</label>
          <input
            className="input-field"
            type="text"
            placeholder=""
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          <div className="input-row">
            <div className="input-group">
              <label className="input-label">Country</label>
              <select className="input-field input-field-small" onChange={(e) => setFormData({ ...formData, country: e.target.value })}>
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">City/Town</label>
              <input
                className="input-field input-field-small"
                type="text"
                placeholder=""
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
            </div>
            <div className="input-group">
              <label className="input-label">Postcode</label>
              <input
                className="input-field input-field-small"
                type="text"
                placeholder=""
                value={formData.postcode}
                onChange={(e) => setFormData({ ...formData, postcode: e.target.value })} />
            </div>
          </div>
          <h2 className="section-title">Payment Details</h2>
          <label className="input-label">Cardholder's Name</label>
          <input
            className="input-field"
            type="text"
            placeholder=""
            maxLength="100"
            value={formData.cardHolder}
            onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })} />
          <label className="input-label">Card Number</label>
          <input
            className="input-field"
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength="16"
            placeholder="1234 5678 9012 3456"
            value={formData.cardNumber}
            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })} />
          <div className="input-row payment-input-row">
            <div className="input-group">
              <label className="input-label">Expiry Date</label>
              <input className="input-field input-field-small" type="month"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })} />
            </div>
            <div className="">
              <label className="input-label">CVC/CVV</label>
              {/* <input
                className="input-field"
                type="number"
                inputMode="numeric"
                maxLength="4"
                placeholder="123"
                value={formData.cvc}
                onChange={(e) => setFormData({ ...formData, cvc: e.target.value })} /> */}
              <input
                className="input-field"
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength="4"
                placeholder="1234 5678 9012 3456"
                value={formData.cvc}
                onChange={(e) => setFormData({ ...formData, cvc: e.target.value })} />
            </div>
          </div>
        </div>
        <div className="checkout-column">
          <div className="column-header">Order Details</div>
          {Cart && (
            <>
              <div className="">
                {Cart.map(item => (
                  <CheckoutBox key={item.productId} item={item} />
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
            <span className="amount-value">£34</span>
          </div>
          <div className="total-row">
            <span className="amount-label">TOTAL:</span>
            <span className="amount-value">{formattedTotal}</span>
          </div>
          {/* <Link to="/checkoutComplete" > */}
          <button type='submit' className="checkout-button" onClick={() => createOrder()}>Checkout</button>
          {/* </Link> */}

        </div>
      </div>
    </div>
  );
};

export default Checkout;