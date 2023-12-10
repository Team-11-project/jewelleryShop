import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import './addCartPage.css';
import DeleteFromCart from './DeleteFromCart'; 
import rolexOyster from './rolexOyster.jpg';

const AddCartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Rolex Oyster Perpetual GOLD', price: 8000.00, quantity: 2, image: rolexOyster },
    { id: 2, name: 'Product 2', price: 30, quantity: 1, image: rolexOyster },
  ]);

  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDeletePopup = (product) => {
    setSelectedProduct(product);
    setDeletePopup(true);
  };

  const handleDeleteItem = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
    setDeletePopup(false);
  };

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
                    <Col md={6} className="item-details">
                      <p className="item-name">{item.name}</p>
                      <p>Price: ${item.price.toFixed(2)}</p>
                    </Col>
                    <Col md={2} className="item-quantity">
                      <p>Quantity: {item.quantity}</p>
                    </Col>
                    <Col md={2}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="delete-icon"
                        onClick={() => handleDeletePopup(item)}
                      />
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

      {deletePopup && (
        <DeleteFromCart
          getDeletePop={setDeletePopup}
          chosenProduct={selectedProduct}
          handleDeleteItem={handleDeleteItem}
        />
      )}
    </Container>
  );
};

export default AddCartPage;
