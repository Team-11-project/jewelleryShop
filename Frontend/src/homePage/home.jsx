import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import './home.css';
import img1 from './img1.jpg';
import img2 from './img2.jpg';
import img3 from './img3.jpg';
import AppNavbar from '../assets/navbar';
import { Link } from 'react-router-dom';

const Home = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const sectionStyle = {
    backgroundImage: `url(${img1})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'relative',
  };

  const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  };

  return (
    <>
      {/* First Section */}
      <AppNavbar />
      <div className="container-fluid section" style={sectionStyle}>
        <div style={overlayStyle}></div>
        <div className="row">
          <div className="col-md-6 d-flex align-items-center justify-content-center text-container">
            <div className="text-center">
              <h1>Discover Unique Jewellery</h1>
              <p>Handcrafted with Love and Precision</p>
              <button className="btn btn-primary">
                <Link to={'/products'}>Explore Now</Link></button>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className="container-fluid section-2">
        <div className="row">
          <div className="col-md-6 order-md-2 d-flex align-items-center justify-content-center text-container">
            <div className="text-center">
              <h1>Shop Our Exquisite <br /> Earring Collection</h1>
              <p>This is the magic of design</p>
              <button className="btn btn-secondary">View Collection</button>
            </div>
          </div>

          <div className="col-md-6 order-md-1 image-container">
            <img src={img2} alt="" className="img-fluid" />
          </div>
        </div>
      </div>

      {/* Third Section */}
      <div className="container-fluid section-3">
        <div className="row">
          <div className="col-md-6 order-md-2 image-container">
            <img src={img3} alt="" className="img-fluid" />
          </div>

          <div className="col-md-6 order-md-1 d-flex align-items-center justify-content-center text-container">
            <div className="text-center">
              <h1>Discover Our New Watch Collection</h1>
              <p>Explore the latest trends in jewellery</p>
              <button className="btn btn-info">View Collection</button>
            </div>
          </div>
        </div>
      </div>

      {/* Fourth Section - New Arrivals */}
      <div className="container-fluid section-4">
        <div className="row">
          <div className="col-md-12 text-container">
            <h1>New Arrivals</h1>
          </div>
        </div>

        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          interval={null} // Set interval to null for manual control
        >
          {[0, 1, 2, 3, 4, 5].map((cardIndex) => (
            <Carousel.Item key={cardIndex}>
              <div className="card-container">
                {[0, 1, 2].map((innerCardIndex) => (
                  <Card key={innerCardIndex}>
                    <Card.Img variant="top" src={img1} />
                    <Card.Body>
                      <Card.Title>Product {cardIndex * 3 + innerCardIndex + 1}</Card.Title>
                      <Card.Text>Description for Product {cardIndex * 3 + innerCardIndex + 1}.</Card.Text>
                      <div className="card-icons">
                        <div className="icon-container">
                          <FontAwesomeIcon icon={faHeart} />
                          <FontAwesomeIcon icon={faShoppingBag} />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Home;
