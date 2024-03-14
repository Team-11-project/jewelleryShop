import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Dropdown, Form, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingBag, faFilter, faSort } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import img1 from './img1.jpg';
import rolexOyster from './rolexOyster.jpg'
import './products.css';
import AppNavbar from '../assets/navbar';
import AuthContext from '../Context/AuthContext';

function Products() {
  let { user } = useContext(AuthContext)
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);
  const [cart, setCart] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [AllProducts, setAllProducts] = useState([])


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
    try {
      // setIsLoading(true)
      const userId = user.user.id
      let response = await fetch(`http://localhost:3001/cart/add/${userId}/${productId}`,
        {
          method: "POST",
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
    getProducts()
  }, [])

  // const products = [
  //   { id: 1, name: 'Rolex Oyster Perpetual', price: 8000, image: rolexOyster },
  //   { id: 2, name: 'Product 2', price: 30, image: img1 },
  //   { id: 3, name: 'Product 2', price: 30, image: img1 },
  //   { id: 4, name: 'Product 2', price: 30, image: img1 },
  //   { id: 5, name: 'Product 2', price: 30, image: img1 },
  //   { id: 6, name: 'Product 2', price: 30, image: img1 },
  //   { id: 7, name: 'Product 2', price: 30, image: img1 },
  //   { id: 8, name: 'Product 2', price: 30, image: img1 },
  //   { id: 9, name: 'Product 2', price: 30, image: img1 },
  // ];

  const priceOptions = ['100-500', '500-1000', '1000-5000', '5000+'];
  const materialOptions = ['Gold', 'Silver', 'Diamond', 'Gemstone'];
  const categoryOptions = ['Earrings', 'Watches', 'Necklaces', 'Bracelets'];
  const sortOptions = ['Recommend', 'New Arrivals', 'Price Low to High', 'Price High to Low'];

  // const addToCart = (product) => {
  //   setCart([...cart, product]);
  // };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

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
                <Form.Label>Material:</Form.Label>
                <Dropdown onSelect={(eventKey) => setSelectedMaterial(eventKey)}>
                  <Dropdown.Toggle variant="light" id="dropdown-material">
                    {selectedMaterial || 'Select Material'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {materialOptions.map((option) => (
                      <Dropdown.Item key={option} eventKey={option}>
                        {option}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              <Form.Group className="filter-group">
                <Form.Label>Category:</Form.Label>
                <Dropdown onSelect={(eventKey) => setSelectedCategory(eventKey)}>
                  <Dropdown.Toggle variant="light" id="dropdown-category">
                    {selectedCategory || 'Select Category'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {categoryOptions.map((option) => (
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
            </div>
          )}
        </div>

        <div className="product-display">
          <div className="card-container">
            {AllProducts.map((product) => (
              <Card key={product.productId}>
                <Link to={`/product/${product.productId}`} state={product}>
                  <Card.Img variant="top" src={product.image} />
                </Link>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>£{product.price}</Card.Text>
                  <div className="card-icons">
                    <a href="#" onClick={() => handleHeartClick(product)}>
                      <FontAwesomeIcon icon={faHeart} className="icon" style={{ color: 'rgb(0, 1, 59)' }} />
                    </a>
                    <Link to="/addCart" onClick={() => addToCart(product?.productId)}>
                      <FontAwesomeIcon icon={faShoppingBag} className="icon" style={{ color: 'rgb(0, 1, 59)' }} />
                    </Link>
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