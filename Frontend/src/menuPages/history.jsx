import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPencilAlt, faCalendarAlt, faDollarSign, faCheckCircle, faShippingFast } from '@fortawesome/free-solid-svg-icons'; // Import required icons
import { Link } from 'react-router-dom'; // Import Link component
import AppNavbar from '../assets/navbar';

const OrderHistory = () => {
  const orders = [
    {
      deliveredTo: "John Doe",
      orderNumber: "ORD123456",
      orderDate: "2024-03-11",
      orderTotal: "$100.00",
      orderStatus: "Delivered"
    },
    {
      deliveredTo: "Jane Smith",
      orderNumber: "ORD789012",
      orderDate: "2024-03-08",
      orderTotal: "$150.00",
      orderStatus: "Shipped"
    }
    // Add more orders as needed
  ];

  return (
    <>
      <AppNavbar />

      <div className="myinfo-page d-flex justify-content-center align-items-center vh-100"> {/* Center the content vertically and horizontally */}
        <div className="container">
          <div className="card rounded-3 shadow-sm" style={{ width: '100%' }}> {/* Set the width to 100% of the screen */}
            <div className="card-body">
              <h5 className="card-title mb-4">Order History</h5>
              {orders.map((order, index) => (
                <div className="card mb-3" style={{width: '100%'}} key={index}> {/* Each order is displayed as a separate card */}
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <p className="card-text"><FontAwesomeIcon icon={faUser} className="me-2" /> <strong>Delivered to:</strong> {order.deliveredTo}</p>
                      <p className="card-text"><FontAwesomeIcon icon={faCalendarAlt} className="me-2" /> <strong>Order Date:</strong> {order.orderDate}</p>
                      <p className="card-text"><FontAwesomeIcon icon={faDollarSign} className="me-2" /> <strong>Order Total:</strong> {order.orderTotal}</p>
                    </div>
                    <div>
                      <p className="card-text"><FontAwesomeIcon icon={order.orderStatus === 'Delivered' ? faCheckCircle : faShippingFast} className="me-2" /> <strong>Order Status:</strong> {order.orderStatus}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
