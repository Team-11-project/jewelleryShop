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
  let { user } = useContext(AuthContext)
  console.log(user.user)
  const [items, setItems] = useState([])
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

  // http://localhost:3000/cart/add/userid/productid
  const getCart = async (userId) => {
    try {
      let response = await fetch(`http://localhost:3000/cart/getOrCreateCart/${userId}`,
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          }
        })
      const resJson = await response.json();
      if (response.status === 200) {
        console.log(resJson.products, "response")
        setItems(resJson.products);
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
                      {/* <Col md={2} className="item-quantity">
                        <p>Quantity: {item.quantity}</p>
                      </Col> */}
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
    </>
  );
};

export default AddCartPage;
