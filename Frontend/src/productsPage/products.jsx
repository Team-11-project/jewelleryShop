import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Dropdown, Form, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingBag, faFilter, faSort } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './products.css';
import AppNavbar from '../assets/navbar'; // Adjust the path as necessary
import AuthContext from '../Context/AuthContext'; // Adjust the path as necessary

function Products() {
  const { user } = useContext(AuthContext);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [AllProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let response = await fetch(`http://localhost:3001/products/get-all-products`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const resJson = await response.json();
        if (response.status === 200) {
          setAllProducts(resJson.response);
        } else {
          alert("error: " + resJson.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  const priceOptions = ['100-500', '500-1000', '1000-5000', '5000+'];
  const materialOptions = ['Gold', 'Silver', 'Diamond', 'Gemstone'];
  const categoryOptions = ['Earrings', 'Watches', 'Necklaces', 'Bracelets'];
  const sortOptions = ['Recommend', 'New Arrivals', 'Price Low to High', 'Price High to Low'];

  const handleToggleFilters = () => setShowFilters(!showFilters);

  const inPriceRange = (product) => {
    if (!selectedPrice) return true;
    const price = parseInt(product.price, 10);
    const [min, max] = selectedPrice.split('-').map(Number);
    if (max) {
      return price >= min && price <= max;
    }
    return price >= min;
  };

  const filteredProducts = AllProducts.filter(product =>
    inPriceRange(product) &&
    (!selectedMaterial || product.material === selectedMaterial) &&
    (!selectedCategory || product.category === selectedCategory)
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    switch (selectedSort) {
      case 'Price Low to High':
        return a.price - b.price;
      case 'Price High to Low':
        return b.price - a.price;
      case 'New Arrivals':
        // Implement logic for sorting by new arrivals if available data supports it
        return 0; // Placeholder
      default:
        return 0; // No sorting or default sorting logic here
    }
  });

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
              {/* Price Filter */}
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

              {/* Material Filter */}
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

              {/* Category Filter */}
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

              {/* Sort Filter */}
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
            {sortedProducts.map((product) => (
              <Card key={product.productId}>
                <Link to={`/product/${product.productId}`} state={product}>
                  <Card.Img variant="top" src={product.image} />
                </Link>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>£{product.price}</Card.Text>
                  <div className="card-icons">
                    <a href="#!" onClick={() => { /* Add to Favorites logic */ }}>
                      <FontAwesomeIcon icon={faHeart} className="icon" style={{ color: 'rgb(0, 1, 59)' }} />
                    </a>
                    <Link to="/cart" onClick={() => { /* Add to Cart logic */ }}>
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
  );
}
export default Products;