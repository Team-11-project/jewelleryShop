import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './addCart.css';
import AppNavbar from '../assets/navbar';
import { useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import { useState } from 'react';

const AddCart = () => {
  let { user } = useContext(AuthContext)
  const [items, setItems] = useState([])
  const getCart = async (userId) => {
    try {
      let response = await fetch(`http://localhost:3001/cart/getOrCreateCart/${userId}`,
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          }
        })
      const resJson = await response.json();
      if (response.status === 200) {
        console.log(resJson.cartProducts, "response")
        setItems(resJson.cartProducts);
      } else {
        console.log(resJson);
        alert("error: " + resJson.message)
      }

    } catch (error) {
      console.log(error)

    }
  }

  useEffect(() => {
    getCart(user.user.id)
  }, [])

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
              <Link to="/products" state={items}>
                <Button variant="primary" className="continue-shopping-btn">
                  Continue Shopping
                </Button>
              </Link>

              {/* Proceed to Checkout Button */}
              <Link to="/checkout" state={items}>
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
