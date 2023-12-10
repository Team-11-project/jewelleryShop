import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import './addCartPage.css';
import DeleteFromCart from './DeleteFromCart';
import rolexOyster from './rolexOyster.jpg';
import Navbar from '../AdminSide/Pages/navbar/navbar';
import AppNavbar from '../assets/navbar';
import AuthContext from '../Context/AuthContext';

const AddCartPage = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDeletePopup = (product) => {
    setSelectedProduct(product);
    setDeletePopup(true);
  };

  const handleDeleteItem = (itemId) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    setDeletePopup(false);
  };

  const getCart = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/cart/getOrCreateCart/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const resJson = await response.json();

      if (response.status === 200) {
        setItems(resJson.products);
      } else {
        console.log(resJson);
        alert('Error: ' + resJson.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCart(user.user.id);
  }, [user]);

  return (
    <>
      <AppNavbar />
      <Container className="add-cart-page-container">
        <Row>
          <Col>
            <div className="add-cart-page-content text-center">
              <h1>Your Shopping Cart</h1>
              <div className="cart-items">
                {items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <Row>
                      <Col md={2}>
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                      </Col>
                      <Col md={6} className="item-details">
                        <p className="item-name">{item.name}</p>
                        <p>Price: ${item.price.toFixed(2)}</p>
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
                <p>Total: ${items.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>
              </div>
              <Button variant="primary" className="checkout-btn">
                Proceed to Checkout
              </Button>
            </div>
          </Col>
        </Row>

        {deletePopup && (
          <DeleteFromCart
            getDeletePop={setDeletePopup}
            chosenProduct={selectedProduct}
            handleDeleteItem={handleDeleteItem}
            user = {user}
          />
        )}
      </Container>
    </>
  );
};

export default AddCartPage;
