import React, { useState, useEffect, useContext } from 'react';
import './OrderDetails.css';
import AuthContext from '../../../../Context/AuthContext';

const OrderDetails = ({ orderId, closePopup }) => {
  const { authTokens } = useContext(AuthContext);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${authTokens.token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Something went wrong fetching the order details.');
        }

        const data = await response.json();
        setOrderDetails(data); 
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, authTokens.token]);

  if (isLoading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (!orderDetails) {
    return null;
  }

  return (
    <div className="order-details-modal">
      <div className="order-details-container">
        <div className="order-details-header">
          <h2>Order #{orderDetails.id}</h2>
          <button onClick={closePopup} className="close-button">X</button>
        </div>
        <div className="order-details-body">
          <div className="order-products">
          </div>
          <div className="order-summary">
            <h3>Summary</h3>
            <p>Total Price: £{orderDetails.totalPrice}</p>
            <p>Status: {orderDetails.status}</p>
          </div>
          <div className="customer-details">
            <h3>Shipping Address</h3>
            <p>City: {orderDetails.city}</p>
            <p>Address: {orderDetails.address}</p>
            <p>Postcode: {orderDetails.postcode}</p>
            <p>Country: {orderDetails.country}</p>
          </div>
          <div className="payment-details">
            <h3>Payment Information</h3>
            <p>Card Holder: {orderDetails.cardHolder}</p>
            <p>Card Number: {orderDetails.cardNumber}</p>
            <p>Expiry Date: {orderDetails.expiryDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;