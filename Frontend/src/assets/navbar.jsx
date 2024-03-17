import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHeart, faShoppingBag, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';
import AuthContext from '../Context/AuthContext';

function AppNavbar() {
  let { user, logoutUser } = useContext(AuthContext)
  const role = user?.user?.role
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Dummy product data
  const products = [
    { id: 1, name: 'Elegant Watch' },
    { id: 2, name: 'Stylish Sunglasses' },
    { id: 3, name: 'Classic Handbag' },
    { id: 4, name: 'Diamond Tennis Bracelet' },
    { id: 5, name: 'Sapphire and Diamond Necklace' },
    { id: 6, name: 'Emerald Stud Earrings' },
    { id: 7, name: 'Pearl and Gold Ring' },
    { id: 8, name: 'Ruby Pendant Necklace' },
    { id: 9, name: 'Amethyst Drop Earrings' },
    { id: 10, name: 'Opal and Silver Bangle' },
    { id: 11, name: 'Topaz Cocktail Ring' },
    { id: 12, name: 'Garnet Choker Necklace' },
    { id: 13, name: 'Turquoise Cuff Bracelet' }
  ];


  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    if (!searchVisible) setSearchInput(''); // Clear search input when closing search
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    if (event.target.value === '') {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // Implement your search logic here
  };

  return (
    <>
      <Navbar sticky='top' className="navbar-custom" expand="lg">
        <Container>
          <Navbar.Brand id="logo" as={Link} to="/" style={{ fontFamily: 'Kapakana', color: 'rgb(255, 217, 119)' }}>
            Regalia
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav">
            <FontAwesomeIcon icon={faBars} style={{ color: "rgb(255, 217, 119)" }} />
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link className="nav-link-custom" as={Link} to="/">Home</Nav.Link>
              <Nav.Link className="nav-link-custom" as={Link} to="/about">About</Nav.Link>
              <Nav.Link className="nav-link-custom" as={Link} to="/products">Products</Nav.Link>
              {/* <Nav.Link className="nav-link-custom" as={Link} to="/best-sellers">Best Sellers</Nav.Link> */}
              {user ? <Nav.Link onClick={logoutUser} className="nav-link-custom" as={Link} to="/">Logout</Nav.Link> : <Nav.Link className="nav-link-custom" as={Link} to="/login">Login</Nav.Link>}
              <Nav.Link className="nav-link-custom" as={Link} to="/contact">Contact</Nav.Link>
              {role === "admin" ? <Nav.Link className="nav-link-custom" as={Link} to="/dashboard">Dashboard</Nav.Link> : <></>}
            </Nav>
            <Nav>
              <Nav.Link className="nav-link-icons" onClick={toggleSearch}>
                <FontAwesomeIcon icon={faSearch} />
              </Nav.Link>
              <Nav.Link className="nav-link-icons">
                <FontAwesomeIcon icon={faHeart} />
              </Nav.Link>
              <Nav.Link className="nav-link-icons">
                <FontAwesomeIcon icon={faUser} />
              </Nav.Link>
              <Nav.Link className="nav-link-icons" as={Link} to="/cart">
                <FontAwesomeIcon icon={faShoppingBag} />
                {/* The shopping bag count can be added here if needed */}
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
                placeholder="Search..."
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              <button type="submit">Search</button>
            </form>
            {searchInput && (
              <div className="dropdown-container">
                <div className="suggested-searches">Suggested Searches</div>
                {filteredProducts.map(product => (
                  <div key={product.id} className="dropdown-item">
                    {product.name}
                  </div>
                ))}
              </div>
            )}
          </Container>
        </div>
      )}
    </>
  );
}

export default AppNavbar;
