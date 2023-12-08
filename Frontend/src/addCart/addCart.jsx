import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Import Link for routing
import './addCart.css';
import AppNavbar from '../assets/navbar';

const AddCart = () => {
  return (
    <>
      <AppNavbar />
      <Container className="add-cart-container">
        <Row>
          <Col>
            <div className="add-cart-content text-center">
              <h1>Added to Cart!</h1>
              <p>You've successfully added the item to your shopping cart.</p>
              <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
              <Button variant="primary" className="continue-shopping-btn">
                Continue Shopping
              </Button>

              {/* Proceed to Checkout Button */}
              <Link to="/checkout">
                <Button variant="dark" className="proceed-to-checkout-btn">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddCart;
