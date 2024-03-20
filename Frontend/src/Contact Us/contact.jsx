import React, { useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import emailjs from 'emailjs-com';
import "./contact.css";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_uadmzp8', 'template_f62wn2p', form.current, 'p-zQ2M_XUsqsbGlsK')
      .then((result) => {
          alert('Message sent successfully');
          form.current.reset();
          console.log(result.text);
      }, (error) => {
          alert('Failed to send the message. Please try again.');
          console.log(error.text);
      });
  };

  return (
    <div className="contact-page">
      <div className="d-flex" style={{ height: '100vh' }}>
        {/* Contact Form Side */}
        <div className="d-flex flex-column justify-content-center align-items-center p-5" style={{ flex: '1' }}>
          <h2 className='text-black text-center cu'>Contact Us</h2>
          <Form ref={form} onSubmit={sendEmail} style={{ width: '100%' }}>
            {/* Name Field */}
            <Form.Group controlId="from_name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="from_name" placeholder="Enter your name" required />
            </Form.Group>

            {/* Email Field */}
            <Form.Group controlId="user_email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="user_email" placeholder="Enter your email" required />
            </Form.Group>

            {/* Message Field */}
            <Form.Group controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" name="message" rows={3} placeholder="Enter your message" required />
            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" className='mt-4' type="submit">Submit</Button>
          </Form>
        </div>

        {/* Contact Information Side */}
        <div className="d-flex flex-column justify-content-center align-items-center p-5" style={{ flex: '1', background: 'rgba(1, 0, 60, 1)' }}>
          <div className="text-center mb-4">
            <h2 className='logoMain'>Regalia</h2>
            <h4>Responsibly crafted jewellery</h4>
            <h6 style={{ fontSize: '0.8em' }}>True luxury in jewellery.</h6>
          </div>

          {/* Contact Information */}
          <div className="text-black text-center">
            <p>
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> regaliajewellery@example.com
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} className="mr-2" /> 0121 65798745
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
