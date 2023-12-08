// AddCartPage.jsx

import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import './addCartPage.css';

// Import your product images
import rolexOyster from './rolexOyster.jpg';

const AddCartPage = () => {
  // Dummy data 
  const cartItems = [
    { id: 1, name: 'Rolex Oyster Perpetual GOLD', price: 8000.00, quantity: 2, image: rolexOyster },
    { id: 2, name: 'Product 2', price: 30, quantity: 1, image: rolexOyster },
  ];

  return (
    <Container className="add-cart-page-container">
      <Row>
        <Col>
          <div className="add-cart-page-content text-center">
            <h1>Your Shopping Cart</h1>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <Row>
                    <Col md={2}>
                      <img src={item.image} alt={item.name} className="cart-item-image" />
                    </Col>
                    <Col md={6}>
                      <p className="item-name">{item.name}</p>
                      <p>Price: ${item.price.toFixed(2)}</p>
                    </Col>
                    <Col md={2}>
                      <p>Quantity: {item.quantity}</p>
                    </Col>
                    <Col md={2}>
                      <FontAwesomeIcon icon={faTrash} className="delete-icon" />
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
            <div className="total">
              <p>Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
            </div>
            <Button variant="primary" className="checkout-btn">Proceed to Checkout</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCartPage;
