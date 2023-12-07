import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingBag, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import './contact.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "", // Added subject field
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., send data to server)
    console.log("Form submitted:", formData);
    // Reset the form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const randomText = "True luxury in jewellery";

  return (
    <Container >
      <Row>
        {/* Form Section */}
        <Col>
          <h2>Contact Us</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button className="mt-3" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>

        {/* Random Text Section */}
        <Col id="boxBlue" className="d-flex align-items-center justify-content-center text-white">
          <h1 className="m-3">Random Responsibly crafted jewellery</h1>
          <p>{randomText}</p>

        </Col>
      </Row>

       {/* Contact Information Section */}
       <Row className="mt-5">
        <Col className="text-center">
          <p>
            <FontAwesomeIcon icon={faPhone} className="mr-2" /> 0121 65798745
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> regaliajewellery@example.com
          </p>
        </Col>
      </Row>
      
    </Container>
  );
};

export default ContactUs;
