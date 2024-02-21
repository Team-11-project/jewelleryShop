import React from 'react';
import './about.css';
import { Container, Row, Col } from 'react-bootstrap';
import img1 from "./img1.png"; 
import img2 from "./img2.png";
import img3 from "./img3.png";
import img4 from "./img4.png";
import img5 from "./img5.png";
import img6 from "./img6.png";
import img7 from "./img7.png";
import img8 from "./img8.png";

const AboutSection = () => {
  return (
    <Container fluid className="about-wrapper">
      <Row className="align-items-center about-section">
        <Col md={6} className="about-text">
          <h1 className="about-title">About Us</h1>
          <p className="brand-name">Regalia</p>
          <p className="about-description">
          Delve into the exquisite world of Regalia. Join us in crafting not just jewelry, but a movement towards breaking barriers. Together, let's celebrate beauty, strength, and innovation, one fine piece at a time. Embrace elegance, drive change.
          </p>
        </Col>
        <Col md={6} className="p-0">
          <img src={img1} alt="About Regalia" className="img-fluid" />
        </Col>
      </Row>

      <Row className="justify-content-center align-items-center mission-section">
        <Col md={12} className="text-center mission-header">
          <h2>Our Mission</h2>
          <p className="mission-statement">Our mission is to deliver uniquely crafted, high-quality jewellery that celebrates life's special moments. We combine traditional craftsmanship with contemporary design, ensuring each piece tells a personal story with elegance and style.</p>
        </Col>
        <Col xs={4} md={4} className="mission-image">
          <img src={img2} alt="Mission 1" className="img-fluid" />
        </Col>
        <Col xs={4} md={4} className="mission-image">
          <img src={img3} alt="Mission 2" className="img-fluid" />
        </Col>
        <Col xs={4} md={4} className="mission-image">
          <img src={img4} alt="Mission 3" className="img-fluid" />
        </Col>
      </Row>

      <Row className="justify-content-center align-items-center values-section">
        <Col md={12} className="text-center values-header">
          <h2>Our Values</h2>
          <p className="values-statement">The principles that guide our craftsmanship, community, and commitment to sustainability.</p>
        </Col>
        <Col xs={4} md={4} className="values-image">
          <img src={img5} alt="Craftsmanship" className="img-fluid" />
          <h3>Artistry & Craftsmanship</h3>
          <p>Every piece is a testament to our artisans' mastery, reflecting unparalleled skill and attention to detail.</p>
        </Col>
        <Col xs={4} md={4} className="values-image">
          <img src={img6} alt="Sustainability" className="img-fluid" />
          <h3>Sustainability</h3>
          <p>We're committed to ethical sourcing and fostering a sustainable future for fashion.</p>
        </Col>
        <Col xs={4} md={4} className="values-image">
          <img src={img7} alt="Community" className="img-fluid" />
          <h3>Community Engagement</h3>
          <p>Regalia isn't just a brand; it's a community of passionate individuals who share a vision for a better world.</p>
        </Col>
      </Row>

      <Row className="justify-content-center align-items-center community-section">
        <Col md={6} className="p-0 community-image">
          <img src={img8} alt="Our Community" className="img-fluid" />
        </Col>
        <Col md={6} className="community-text">
          <h2>Our Community</h2>
          <p>Welcome to our Regalia Community—where diversity, achievement, and shared values take center stage. Whether you're a cherished customer, a skilled artisan, or an influencer, you're not just welcome; you're embraced.</p>
          <p>At Regalia, we celebrate inclusivity and invite collaboration. Join us in shaping the legacy of responsible luxury. It's a Regalia gathering, and you're an honored guest. Connect with us for new possibilities and shared visions.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutSection;
