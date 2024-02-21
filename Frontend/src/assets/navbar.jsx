// navbar.jsx
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
  const [searchVisible, setSearchVisible] = useState(false);
  let { authTokens, user, logoutUser } = useContext(AuthContext)

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const customFontStyle = {
    fontFamily: 'YourCustomFont',
  };

  return (
    <Navbar sticky='top' className="navbar-custom" expand="lg">
      <Container>
        <Navbar.Brand id="logo" as={Link} to="/" style={customFontStyle}>
          Regalia
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav">
          <FontAwesomeIcon icon={faBars} style={{ color: "rgb(255, 217, 119)" }} />
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link className="nav-link-custom" as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link className="nav-link-custom" as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link className="nav-link-custom" as={Link} to="/products">
              Products
            </Nav.Link>

            {
              authTokens
                ?
                <Nav.Link className="nav-link-custom" onClick={() => logoutUser()}>
                  logout
                </Nav.Link>
                :
                <Nav.Link className="nav-link-custom" as={Link} to="/login">
                  login
                </Nav.Link>
            }

            <Nav.Link className="nav-link-custom" as={Link} to="/contact">
              Contact
            </Nav.Link>
            {
              user?.user.role === 'admin'
                ?
                <Nav.Link className="nav-link-custom" as={Link} to="/dashboard">
                  Dashboard
                </Nav.Link>
                :
                <></>

            }
            {/* <Nav.Link className="nav-link-custom" as={Link} to="/dashboard">
              Dashboard
            </Nav.Link> */}
          </Nav>
          <Nav>
            <Nav.Link className="nav-link-icons" href="#" onClick={toggleSearch}>
              <FontAwesomeIcon icon={faSearch} style={{ color: "#ffdb77" }} />
            </Nav.Link>
            <Nav.Link className="nav-link-icons" href="#">
              <FontAwesomeIcon icon={faHeart} style={{ color: "#ffd977" }} />
            </Nav.Link>
            <Nav.Link className="nav-link-icons" href="#">
              <FontAwesomeIcon icon={faUser} style={{ color: "#ffd977" }} />
            </Nav.Link>
            <Nav.Link className="nav-link-icons" href="/cart">

              <FontAwesomeIcon icon={faShoppingBag} style={{ color: "#ffd977" }} />
              {/* <div className="shopping-bag-count">5</div> */}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {searchVisible && (
          <div className="search-container">
            <input type="text" placeholder="Search..." />
          </div>
        )}
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
