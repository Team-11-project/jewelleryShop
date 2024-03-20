import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import img1 from './img1.jpg';
import img2 from './img2.jpg';
import img3 from './img3.jpg';
import img4 from './img4.jpg'; 
import img5 from './img5.jpg'; 
import img6 from './img6.jpg';
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
      
      <AppNavbar />
      <div className="container-fluid section" style={sectionStyle}>
        <div style={overlayStyle}></div>
        <div className="row">
          <div className="col-md-6 d-flex align-items-center justify-content-center text-container">
            <div className="text-center">
              <h1>Discover Unique Jewellery</h1>
              <p>Handcrafted with Love and Precision</p>
              <button className="btn btn-primary"><Link to={'/products'}>Explore Now</Link></button>
            </div>
          </div>
        </div>
      </div>

     
      <div className="container-fluid section-2">
        <div className="row">
          <div className="col-md-6 order-md-2 d-flex align-items-center justify-content-center text-container">
            <div className="text-center">
              <h1>Shop Our Exquisite <br /> Earrings Collection</h1>
              <p>This is the magic of design</p>
              <button className="btn btn-secondary"><Link to={'/Earrings'}>Explore Now</Link></button>
            </div>
          </div>
          <div className="col-md-6 order-md-1 image-container">
            <img src={img2} alt="" className="img-fluid" />
          </div>
        </div>
      </div>

     
      <div className="container-fluid section-3">
        <div className="row">
          <div className="col-md-6 order-md-2 image-container">
            <img src={img3} alt="" className="img-fluid" />
          </div>
          <div className="col-md-6 order-md-1 d-flex align-items-center justify-content-center text-container">
            <div className="text-center">
              <h1>Discover Our New Watches Collection</h1>
              <p>Explore the latest trends in jewellery</p>
              <button className="btn btn-info"><Link to={'/Watches'}>Explore Now</Link></button>
            </div>
          </div>
        </div>
      </div>

<div className="container-fluid rings-section">
        <div className="row">
          <div className="col-md-6 order-md-1 image-container">
            <img src={img4} alt="" className="img-fluid" />
          </div>
          <div className="col-md-6 order-md-2 d-flex align-items-center justify-content-center text-container">
            <div className="text-center">
              <h1>Shop Our Elegant <br /> Rings Collection</h1>
              <p>Embrace timeless beauty</p>
              <button className="btn btn-secondary"><Link to={'/Rings'}>Explore Now</Link></button>
            </div>
          </div>
        </div>
      </div>

      
      <div className="container-fluid necklaces-section">
        <div className="row">
          <div className="col-md-6 order-md-1 d-flex align-items-center justify-content-center text-container">
            <div className="text-center">
              <h1>Discover Our Stunning <br /> Necklaces Collection</h1>
              <p>Find your perfect match</p>
              <button className="btn btn-info"><Link to={'/Necklaces'}>Explore Now</Link></button>
            </div>
          </div>
          <div className="col-md-6 order-md-2 image-container">
            <img src={img5} alt="" className="img-fluid" />
          </div>
        </div>
      </div>

      
      <div className="container-fluid bracelets-section">
        <div className="row">
          <div className="col-md-6 order-md-1 image-container">
            <img src={img6} alt="" className="img-fluid" />
          </div>
          <div className="col-md-6 order-md-2 d-flex align-items-center justify-content-center text-container">
            <div className="text-center">
              <h1>Explore Our Bracelets <br /> Collection</h1>
              <p>Wear your style on your wrist</p>
              <button className="btn btn-secondary"><Link to={'/Bracelets'}>Explore Now</Link></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;