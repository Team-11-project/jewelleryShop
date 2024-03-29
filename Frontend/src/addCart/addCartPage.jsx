import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import './addCartPage.css';
import DeleteFromCart from './DeleteFromCart';
import rolexOyster from './rolexOyster.jpg';
import Navbar from '../AdminSide/Pages/navbar/navbar';
import AppNavbar from '../assets/navbar';
import AuthContext from '../Context/AuthContext';
import { Link } from 'react-router-dom';


const AddCartPage = () => {

  const imgPath = 'src/assets/'
  let { user } = useContext(AuthContext)
  // console.log(user.user)
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Rolex Oyster Perpetual GOLD', price: 8000.00, quantity: 2, image: rolexOyster },
    { id: 2, name: 'Product 2', price: 30, quantity: 1, image: rolexOyster },
  ]);
  const [edit, setEdit] = useState(false)

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

  const deleteFromCart = async (cartProductId) => {
    // http://localhost:300/cart/add/userid/productid
    try {
      // setIsLoading(true)
      const userId = user.user.id
      let response = await fetch(`http://localhost:3001/cart/deleteFromCart/${userId}/${cartProductId}`,
        {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
          }
        })
      // handlePop(false);
      // const resJson = await response.json();
    }
    catch (error) {
      // setIsLoading(true)
      console.log(error)
    }
  }

  const getCart = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/cart/getOrCreateCart/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const resJson = await response.json();

      if (response.status === 200) {
        setItems(resJson.cartProducts);
      } else {
        console.log(resJson);
        alert('Error: ' + resJson.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (productId) => {
    // http://localhost:300/cart/add/userid/productid
    try {
      // setIsLoading(true)
      const userId = user.user.id
      let response = await fetch(`http://localhost:3001/cart/add/${userId}/${productId}/1`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          }
        })
      const resJson = await response.json();
    }
    catch (error) {
      // setIsLoading(true)
      console.log(error)
    }
  }

  const reduceFromCart = async (cartProductId) => {
    // http://localhost:300/cart/add/userid/productid
    try {
      // setIsLoading(true)
      const userId = user.user.id
      let response = await fetch(`http://localhost:3001/cart/reduceQtyinCart/${userId}/${cartProductId}`,
        {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
          }
        })
      // const resJson = await response.json();
    }
    catch (error) {
      // setIsLoading(true)
      console.log(error)
    }
  }

  useEffect(() => {
    if (user) {
      getCart(user?.user.id)
    }
    setTimeout(() => {
      setEdit(false)

    }, 1000);
  }, [deletePopup, edit])

  const QtyComponent = (prodId, qty, cartProdId) => {
    return (
      <div className="qtyComponent">
        <div className="reduce" onClick={() => { setEdit(true); reduceFromCart(cartProdId) }}><FontAwesomeIcon icon={faMinus} /></div>
        <div className="qty">{qty}</div>
        <div className="increase" onClick={() => { setEdit(true); addToCart(prodId) }}> <FontAwesomeIcon icon={faPlus} /></div>
      </div>
    )
  }

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
                        <img src={imgPath + item?.product?.image} alt={item?.product?.name} className="cart-item-image" />
                      </Col>
                      <Col md={6} className="item-details">
                        <p className="item-name">{item?.product?.name}</p>
                        <p>Price: £{item.product.price.toFixed(2)}</p>
                        {QtyComponent(item?.product?.productId, item.qty, item.id)}
                      </Col>
                      <Col md={2}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="delete-icon"
                          onClick={() => { setEdit(true); deleteFromCart(item.id) }}
                        />
                      </Col>
                    </Row>
                  </div>
                ))}
              </div>
              <div className="total">
                <p>Total: £{items.reduce((total, item) => total + (item.product.price * item.qty), 0).toFixed(2)}</p>
              </div>
              <Link to="/checkout" state={items}>
                <Button variant="dark" className="proceed-to-checkout-btn">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </Col>
        </Row>

        {/* {deletePopup && (
          <DeleteFromCart
            getDeletePop={setDeletePopup}
            chosenProduct={selectedProduct}
            handleDeleteItem={handleDeleteItem}
            user={user}
          />
        )} */}
      </Container>
    </>
  );
};

export default AddCartPage;
