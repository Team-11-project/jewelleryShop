import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const backendUrl = 'http://localhost:3001/api/contact';

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      alert('Message sent successfully');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('There was an error submitting the form:', error);
      alert('Failed to send the message');
    }
  };

  return (
    <div className="contact-page">
      <div className="d-flex" style={{ height: '100vh' }}>
        <div className="d-flex flex-column justify-content-center align-items-center p-5" style={{ flex: '1' }}>
          <h2 className='text-black text-center cu'>Contact Us</h2>
          <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" placeholder="Enter the subject" value={formData.subject} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter your message" value={formData.message} onChange={handleChange} required />
            </Form.Group>

            <Button variant="primary" className='mt-4' type="submit">Submit</Button>
          </Form>
          <div className="text-black text-center">
            <p>
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> regaliajewellery@example.com
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} className="mr-2" /> 0121 65798745
            </p>
          </div>
        </div>

        <div className="d-flex flex-column justify-content-center align-items-center p-5" style={{ flex: '1', background: 'rgba(1, 0, 60, 1)' }}>
          <div className="text-center mb-4">
            <h2 className='logoMain'>Regalia</h2>
            <h4>Responsibly crafted jewellery</h4>
            <h6 style={{ fontSize: '0.8em' }}>True luxury in jewellery.</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
