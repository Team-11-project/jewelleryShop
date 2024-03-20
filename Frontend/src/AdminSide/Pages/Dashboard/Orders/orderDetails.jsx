// OrderDetails.js
import React, { useState, useContext, useEffect } from 'react';
import './OrderDetails.css';
import AuthContext from '../../../../Context/AuthContext';
import { FaPencilAlt } from 'react-icons/fa';

const OrderDetails = ({ orderId, closePopup }) => {
  const { authTokens } = useContext(AuthContext);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [statusEditMode, setStatusEditMode] = useState(false);
  const [editedInfo, setEditedInfo] = useState({});

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
        setEditedInfo({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          address: data.address,
          city: data.city,
          postcode: data.postcode,
          country: data.country,
          status: data.status,
        });
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, authTokens.token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (e) => {
    setEditedInfo(prev => ({ ...prev, status: e.target.value }));
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleStatusEditClick = () => {
    setStatusEditMode(true);
  };

  const handleSaveInfo = async () => {
    updateOrderInformation({
      city: editedInfo.city,
      address: editedInfo.address,
      postcode: editedInfo.postcode,
      country: editedInfo.country
    });
    setEditMode(false);
  };

  const handleSaveStatus = async () => {
    updateOrderStatus(editedInfo.status);
    setStatusEditMode(false);
  };

  // Function to mask card number except the last four digits
  const maskCardNumber = (cardNumber) => cardNumber.slice(-4).padStart(cardNumber.length, '*');
  const updateOrderInformation = async (info) => {
    try {
      const response = await fetch(`http://localhost:3001/cart/updateOrderInformation/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens.token}`,
        },
        body: JSON.stringify(info),
      });

      if (!response.ok) {
        throw new Error('Failed to update order information.');
      }

      const updatedInfo = await response.json();
      setOrderDetails({ ...orderDetails, ...updatedInfo });
    } catch (error) {
      console.error("Error updating order information:", error);
    }
  };

  const updateOrderStatus = async (newStatus) => {
    try {
      const response = await fetch(`http://localhost:3001/cart/updateOrderStatus/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens.token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update order status.');
      }
  
      // Assuming your API returns the updated order details after the update
      const updatedData = await response.json();
      setOrderDetails({ ...orderDetails, status: updatedData.status });
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  
  if (isLoading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (!orderDetails) {
    return null;
  }

  const statusString = typeof orderDetails.status === 'string' ? orderDetails.status : '';
  
  return (
    <div className="order-details-modal">
      <div className="order-details-container">
        <div className="order-details-header">
          <h2>Order #{orderDetails.id}</h2>
          <button onClick={closePopup} className="close-button">X</button>
        </div>
        <div className="order-details-body">
          {/* Summary Section */}
          <div className="summary-section">
            <h3>Summary</h3>
            <p>Date: {new Date(orderDetails.createdAt).toLocaleDateString()}</p>
            <p>Total Price: £{orderDetails.totalPrice.toFixed(2)}</p>
            <div className="status-section">
              {statusEditMode ? (
                <>
                  <select
                    value={editedInfo.status}
                    onChange={handleStatusChange}
                    className={`status-tag status-${editedInfo.status}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Returned">Returned</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <button onClick={handleSaveStatus}>Save Status</button>
                </>
              ) : (
                <div className={`status-tag status-${orderDetails.status}`}>
                  {orderDetails.status} <FaPencilAlt onClick={handleStatusEditClick} className="edit-icon" />
                </div>
              )}
            </div>
          </div>
  
          {/* Customer Information Section */}
          <div className="customer-info-section">
            <h3>Customer Information</h3>
            {editMode ? (
              <>
                <input type="text" name="firstName" placeholder="First Name" value={editedInfo.firstName || ''} onChange={handleInputChange} />
                <input type="text" name="lastName" placeholder="Last Name" value={editedInfo.lastName || ''} onChange={handleInputChange} />
                <input type="email" name="email" placeholder="Email" value={editedInfo.email || ''} onChange={handleInputChange} />
                <input type="text" name="address" placeholder="Address" value={editedInfo.address || ''} onChange={handleInputChange} />
                <input type="text" name="city" placeholder="City" value={editedInfo.city || ''} onChange={handleInputChange} />
                <input type="text" name="postcode" placeholder="Postcode" value={editedInfo.postcode || ''} onChange={handleInputChange} />
                <input type="text" name="country" placeholder="Country" value={editedInfo.country || ''} onChange={handleInputChange} />
                <button onClick={handleSaveInfo}>Save Info</button>
              </>
            ) : (
              <>
                <p>Name: {orderDetails.firstName} {orderDetails.lastName}</p>
                <p>Email: {orderDetails.email}</p>
                <p>Address: {orderDetails.address}, {orderDetails.city}, {orderDetails.postcode}, {orderDetails.country}</p>
                <FaPencilAlt onClick={handleEditClick} className="edit-icon" />
              </>
            )}
          </div>
  
          {/* Payment Information Section */}
          <div className="payment-info-section">
            <h3>Payment Information</h3>
            <p>Card Holder: {orderDetails.cardHolder}</p>
            <p>Card Number: {maskCardNumber(orderDetails.cardNumber)}</p>
            <p>Expiry Date: {orderDetails.expiryDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrderDetails;