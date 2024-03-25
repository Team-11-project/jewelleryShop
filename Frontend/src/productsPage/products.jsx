import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Dropdown, Form, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingBag, faFilter, faSort, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import img1 from './img1.jpg';
import rolexOyster from './rolexOyster.jpg'
import './products.css';
import AppNavbar from '../assets/navbar';
import AuthContext from '../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';

function Products() {
  const notify = (message) => toast(message);
  // const imgPath = "src/assets/"
  const imgPath = "../../src/assets/"
  let { user, authTokens } = useContext(AuthContext)
  const userId = user?.user?.id
  const pathToImages = '../../src/assets/'
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);
  const [cart, setCart] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [AllProducts, setAllProducts] = useState([])
  const [favorites, setFavorites] = useState([])
  const [isRemove, setIsRemove] = useState(false)
  const [isfave, setIsfave] = useState(false)

  const isAFave = (productId) => {
    const found = favorites.find((element) => element?.product.productId == productId);
    if (found) {
      // setIsfave(true)
      return true
    }
    // setIsfave(false)
    return false
  }

  const StockStatus = (product) => {
    const status = {
      message: "",
      color: ""
    }
    const stock = product?.stock
    if (stock > 1 && stock <= 5) {
      status.message = stock + " left in stock "
      status.color = "orange"
    }
    else if (stock > 5) {
      status.message = "In Stock"
      status.color = "green"
    }
    else {
      status.message = "Out Of Stock"
      status.color = "red"
    }
    return status
  }

  const getFavorites = async (userId) => {
    const token = authTokens?.token
    try {
      let response = await fetch(`http://localhost:3001/favorites/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
      });
      const resJson = await response.json();
      if (resJson.status === 200) {
        setFavorites(resJson.response);
      } else {
        console.log(resJson);
        // notify('error: ' + resJson.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const addToFavorites = async (productId) => {
    const userId = user?.user?.id
    const token = authTokens?.token
    try {
      let response = await fetch(`http://localhost:3001/favorites/addToFavorites/${userId}/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
      });
      const resJson = await response.json();
      if (resJson.status === 200) {
        notify(resJson.message);
      } else {
        notify('error: ' + resJson.message);
      }
      setIsRemove(false)
    } catch (error) {
      console.log(error);
    }
  }

  const getProducts = async () => {
    try {
      // setIsLoading(true)
      let response = await fetch(`http://localhost:3001/products/get-all-products`,
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          }
        })
      const resJson = await response.json();
      if (response.status === 200) {
        console.log(resJson, "response")
        setAllProducts(resJson.response);
      } else {
        console.log(resJson);
        alert("error: " + resJson.message)
      }
    }
    catch (error) {
      // setIsLoading(true)
      console.log(error)
    }
  }

  const addToCart = async (productId) => {
    // http://localhost:300/cart/add/userid/productid
    // console.log(userIdId)
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
      if (resJson.status == 200) {
        notify(resJson.message)
      }
    }
    catch (error) {
      // setIsLoading(true)
      console.log(error)
    }
  }

  const removeFromFavorites = async (userId, productId) => {
    const token = authTokens?.token
    try {
      let response = await fetch(`
        http://localhost:3001/favorites/remove-from-favorites/${userId}/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const resJson = await response.json();
      if (response.status === 200) {
        notify(resJson.message);
      } else {
        notify('error: ' + resJson.message);
      }
      setIsRemove(false)
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getProducts()
    // console.log(user.user, "user")
    getFavorites(user?.user?.id)
  }, [isRemove])

  const priceOptions = ['100-500', '500-1000', '1000-5000', '5000+'];
  const sortOptions = ['Price Low to High', 'Price High to Low'];


  const handleToggleFilters = () => setShowFilters(!showFilters);

  const resetFilters = () => {
    setSelectedPrice(null);
    setSelectedSort(null);
  };

  const inPriceRange = (product) => {
    if (!selectedPrice) return true;
    const price = parseInt(product.price, 10);
    const [min, max] = selectedPrice.split('-').map((value) => {
      if (value === '5000+') {
        return [5000, Number.MAX_VALUE];
      }
      return value.split('-').map(Number);
    }).flat();
    console.log('min:', min, 'max:', max, 'price:', price);
    return price >= min && price <= max;
  };


  const filteredProducts = AllProducts.filter(product =>
    inPriceRange(product)
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    switch (selectedSort) {
      case 'Price Low to High':
        return a.price - b.price;
      case 'Price High to Low':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const handleHeartClick = (product) => {
    // Handle heart icon click, e.g., add to favorites/liked
    console.log(`Added ${product.name} to favorites/liked`);
  };

  const handleShoppingBagClick = (product) => {
    // Handle shopping bag icon click, e.g., add to cart
    addToCart(product);
    console.log(`Added ${product.name} to the shopping bag`);
  };

  return (
    <>
      <AppNavbar />
      <Container className="products-container">

        <Row>
          <Col>
            <div className="products-intro">
              <h1>All Products</h1>
              <p>Explore our wide range of exquisite products. Find the perfect piece for every occasion.</p>
            </div>
          </Col>
        </Row>

        <div className="filter-bar">
          <Button variant="light" className="filter-toggle" onClick={handleToggleFilters}>
            <FontAwesomeIcon icon={faSort} color="rgb(255,217,119)" />
            <FontAwesomeIcon icon={faFilter} color="rgb(255,217,119)" />
          </Button>

          {showFilters && (
            <div className="filter-options">
              <Form.Group className="filter-group">
                <Form.Label>Price:</Form.Label>
                <Dropdown onSelect={(eventKey) => setSelectedPrice(eventKey)}>
                  <Dropdown.Toggle variant="light" id="dropdown-price">
                    {selectedPrice || 'Select Price Range'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {priceOptions.map((option) => (
                      <Dropdown.Item key={option} eventKey={option}>
                        {option}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              <Form.Group className="filter-group">
                <Form.Label>Sort By:</Form.Label>
                <Dropdown onSelect={(eventKey) => setSelectedSort(eventKey)}>
                  <Dropdown.Toggle variant="light" id="dropdown-sort">
                    {selectedSort || 'Select Sorting'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {sortOptions.map((option) => (
                      <Dropdown.Item key={option} eventKey={option}>
                        {option}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
              <Button variant="danger" className="reset" onClick={resetFilters}>
              Reset
            </Button>
            </div>
          )}
        </div>

        <div className="product-display">
          <div className="card-container">
            {sortedProducts.map((product) => (
              <Card key={product.productId}>
                <Link to={`/product/${product.productId}`} state={product}>
                  <Card.Img variant="top" src={pathToImages + product.image} />
                </Link>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>£{product.price}</Card.Text>
                  <div className="card-icons">
                    {(isAFave(product?.productId)) === true
                      ?
                      <a href="#!" onClick={() => { removeFromFavorites(user?.user?.id, product.productId); setIsRemove(true) }}>
                        <FontAwesomeIcon icon={faXmark} className="rem-icon" style={{ color: 'rgb(0, 1, 59)' }} />

                      </a>
                      :
                      <a href="#!" onClick={() => { addToFavorites(product?.productId); setIsRemove(true) }}>
                        <FontAwesomeIcon icon={faHeart} className="icon" style={{ color: 'rgb(0, 1, 59)' }} />
                      </a>
                    }


                    {/* <Link to="/addCart" onClick={() => addToCart(product?.productId)}> */}
                    <FontAwesomeIcon icon={faShoppingBag} className="icon" style={{ color: 'rgb(0, 1, 59)' }} onClick={() => addToCart(product?.productId)} />
                    {/* </Link> */}
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}
export default Products;