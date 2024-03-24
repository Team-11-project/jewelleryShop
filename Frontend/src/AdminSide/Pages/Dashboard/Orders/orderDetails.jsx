import React, { useState, useContext, useEffect } from 'react';
import './OrderDetails.css';
import AuthContext from '../../../../Context/AuthContext';
import { FaPencilAlt } from 'react-icons/fa';

const OrderDetails = ({ orderId, closePopup }) => {
  const imgPath = '../../../../../src/assets/'
  const { authTokens } = useContext(AuthContext);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedInfo, setEditedInfo] = useState({});
  const [products, setProducts] = useState([])

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
        console.log(data)
        setProducts(data?.cartProducts)
        setEditedInfo({
          firstName: data.user?.firstName,
          lastName: data.user?.lastName,
          email: data.user?.email,
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

  const handleEditClick = () => {
    setEditMode(true);
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

  const handleStatusEditClick = () => {
    setEditMode(true);
  };

  const handleSaveStatus = async () => {
    try {
      console.log(JSON.stringify({ status: editedInfo.status }),)
      const response = await fetch(`http://localhost:3001/cart/updateOrderStatus/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens.token}`,
        },
        body: JSON.stringify({ newStatus: editedInfo.status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status.');
      }

      const updatedData = await response.json();
      console.log('Updated Order Details:', updatedData);
      setOrderDetails({ ...orderDetails, status: updatedData.status });
      setEditMode(false);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const ItemBox = (item) => {
    console.log(item, "item")
    return (
      <>
        <div className="prods">
          <div className="each-prod">
            <div className="imgSide">
              <img src={imgPath + item?.product?.image} alt="product image" />
            </div>
            <div className="detailSide">
              <div className="deets">
                <div className="t">{item?.product?.name}</div>
                <div className="b">Qty: {item?.qty}</div>
              </div>
              <div className="pr">£{item?.product?.price}</div>
            </div>
          </div>
        </div>
        {/* <div className="itemContainer">
          <img src={imgPath + item?.product?.image} alt="product image" />
          <div className="infoSide"> */}
        {/* <p>{item?.product?.name}</p>
                    <p>Price: £{item?.product?.price}</p> */}
        {/* <button className='reviewCreate' onClick={() => { setSelectedItem(item); setIsReview(true) }}>create review</button>
            <p>Qty: {item.qty}</p>
          </div>

        </div> */}
      </>
    )

  }

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
      const lowercaseStatus = newStatus.toLowerCase();

      const response = await fetch(`http://localhost:3001/cart/updateOrderStatus/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens.token}`,
        },
        body: JSON.stringify({ status: lowercaseStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status.');
      }


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
          <div className="body-left">
            {products.length > 0 && (
              <div className="products-section">
                <h3>Products</h3>
                {products.map(product => (
                  <div className="">
                    {ItemBox(product)}
                  </div>
                ))}
              </div>
            )}

            <div className="summary-section">
              <h3>Summary</h3>
              <p>Date: {new Date(orderDetails.createdAt).toLocaleDateString()}</p>
              <p>Total Price: £{orderDetails.totalPrice.toFixed(2)}</p>
              <div className="status-section">
                {editMode ? (
                  <>
                    <input
                      type="text"
                      name="status"
                      value={editedInfo.status}
                      onChange={handleInputChange}
                      placeholder="Status"
                    />
                    <button onClick={handleSaveStatus}>Save Status</button>
                  </>
                ) : (
                  <div className="status-tag">
                    {orderDetails.status} <FaPencilAlt onClick={handleStatusEditClick} className="edit-icon" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="body-right">
            <div className="customer-info-section">
              <h3>Customer Information</h3>
              {editMode ? (
                <>
                  <input disabled={true} type="text" name="firstName" placeholder="First Name" value={editedInfo.firstName || ''} onChange={handleInputChange} />
                  <input disabled={true} type="text" name="lastName" placeholder="Last Name" value={editedInfo.lastName || ''} onChange={handleInputChange} />
                  <input disabled={true} type="email" name="email" placeholder="Email" value={editedInfo.email || ''} onChange={handleInputChange} />
                  <input type="text" name="address" placeholder="Address" value={editedInfo.address || ''} onChange={handleInputChange} />
                  <input type="text" name="city" placeholder="City" value={editedInfo.city || ''} onChange={handleInputChange} />
                  <input type="text" name="postcode" placeholder="Postcode" value={editedInfo.postcode || ''} onChange={handleInputChange} />
                  <input type="text" name="country" placeholder="Country" value={editedInfo.country || ''} onChange={handleInputChange} />
                  <button onClick={handleSaveInfo}>Save Info</button>
                </>
              ) : (
                <>
                  <p>Name: {orderDetails.user?.firstName} {orderDetails.user?.lastName}</p>
                  <p>Email: {orderDetails.user?.email}</p>
                  <p>Address: {orderDetails.address}, {orderDetails.city}, {orderDetails.postcode}, {orderDetails.country}</p>
                  <FaPencilAlt onClick={handleEditClick} className="edit-icon" />
                </>
              )}
            </div>
            <div className="payment-info-section">
              <h3>Payment Information</h3>
              <p>Card Holder: {orderDetails.cardHolder}</p>
              <p>Card Number: {maskCardNumber(orderDetails.cardNumber)}</p>
              <p>Expiry Date: {new Date(orderDetails.expiryDate).toLocaleDateString()}</p>
            </div>
          </div>



        </div>
      </div>
    </div>
  );
}

export default OrderDetails;