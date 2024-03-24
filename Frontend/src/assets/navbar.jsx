import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHeart, faShoppingBag, faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';
import AuthContext from '../Context/AuthContext';

function AppNavbar() {
  let { user, logoutUser } = useContext(AuthContext)
  const role = user?.user?.role
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3001/products/get-all-products')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data.response);
        setLoading(false);
      })
      .catch((err) => {
        setError(`Error: ${err.message}`);
        setLoading(false);
      });
  }, []);

  const toggleSearch = () => {
    setSearchVisible(prev => !prev);
    if (searchVisible) {
      setSearchInput('');
      setFilteredProducts([]);
    }
  };

  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);
    if (!value.trim()) {
      setFilteredProducts([]);
    } else {
      const searchLower = value.toLowerCase();
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchLower)
      );
      setFilteredProducts(filtered);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // Logic for when a user submits the search form, if needed
  };

  return (
    <>
      <Navbar sticky="top" className="navbar-custom" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" id="logo">
            Regalia
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav">
            <FontAwesomeIcon icon={faBars} />
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link className="nav-link-custom" as={Link} to="/">Home</Nav.Link>
              <Nav.Link className="nav-link-custom" as={Link} to="/about">About</Nav.Link>
              <Nav.Link className="nav-link-custom" as={Link} to="/products">Products</Nav.Link>
              {/* <Nav.Link className="nav-link-custom" as={Link} to="/best-sellers">Best Sellers</Nav.Link> */}
              {user ? <Nav.Link onClick={logoutUser} className="nav-link-custom" as={Link} to="/">Logout</Nav.Link> : <Nav.Link className="nav-link-custom" as={Link} to="/login">Login</Nav.Link>}
              <Nav.Link className="nav-link-custom" as={Link} to="/contact">Contact</Nav.Link>
              {role == "admin" ? <Nav.Link className="nav-link-custom" as={Link} to="/dashboard">Dashboard</Nav.Link> : <></>}
            </Nav>
            <Nav>
              <Nav.Link onClick={toggleSearch} className="nav-link-icons">
                <FontAwesomeIcon icon={searchVisible ? faTimes : faSearch} />
              </Nav.Link>
              <Nav.Link className="nav-link-icons">
                <FontAwesomeIcon icon={faHeart} />
              </Nav.Link>
              <Nav.Link className="nav-link-icons" as={Link} to="/myProfile">
                <FontAwesomeIcon icon={faUser} />
              </Nav.Link>
              <Nav.Link as={Link} to="/cart" className="nav-link-icons">
                <FontAwesomeIcon icon={faShoppingBag} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {searchVisible && (
        <div className="search-bar-container">
          <Container>
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                className="form-control"
                placeholder="Search for products..."
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </form>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <div className="dropdown-container">
              {filteredProducts.map((product) => (
                <Link key={product.productId} to={`/product/${product.productId}`} state={product}>
                  <div className="dropdown-item">{product.name}</div>
                </Link>
              ))}
            </div>
          </Container>
        </div>
      )}
    </>
  );
}

export default AppNavbar;