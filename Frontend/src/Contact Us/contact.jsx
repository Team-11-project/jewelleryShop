import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import "./contact.css";
const Contact = () => {
  return (
    <div className="contact-page">
      <div className="d-flex" style={{ height: '100vh' }}>
        {/* Left Div */}
        <div
          className="d-flex flex-column justify-content-center align-items-center p-5"
          style={{ flex: '1'}}
        >

        <h2 className='text-black text-center cu'>Contact Us</h2>

          <Form style={{ width: '100%' }}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group controlId="formSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" placeholder="Enter the subject" />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter your message" />
            </Form.Group>

            <Button variant="primary" className='mt-4' type="submit">
              Submit
            </Button>
          </Form>

                  {/* Contact Information */}
          <div className="text-black text-center" >
            <p>
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> regaliajewellery@example.com
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} className="mr-2" /> 0121 65798745
            </p>
          </div>
        </div>

        {/* Right Div */}
        <div
          className="d-flex flex-column justify-content-center align-items-center p-5"
          style={{ flex: '1', background: 'rgba(1, 0, 60, 1)', }}
        >
          <div className="text-center  mb-4">
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
