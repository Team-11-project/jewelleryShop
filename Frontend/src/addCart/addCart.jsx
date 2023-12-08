import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './addCart.css';

const AddCart = () => {
  return (
    <Container className="add-cart-container">
      <Row>
        <Col>
          <div className="add-cart-content text-center">
            <h1>Added to Cart!</h1>
            <p>You've successfully added the item to your shopping cart.</p>
            <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
            
            <Link to="/products">
            <Button variant="primary" className="continue-shopping-btn">
              Continue Shopping
            </Button>
            </Link>
            <Link to="/addCartPage">
            <Button variant="primary" className="view-shopping-cart-btn">
              View Shopping Cart
            </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCart;
