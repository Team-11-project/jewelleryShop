import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, ListGroup } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './individualProducts.css';
import AppNavbar from '../assets/navbar';
import AuthContext from '../Context/AuthContext';

function IndividualProduct() {
  const location = useLocation();
  const product = location.state;
  let { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [reviewContent, setReviewContent] = useState('');

  useEffect(() => {
    const fetchProductReviews = async () => {
      const res = await fetch(`http://localhost:3001/reviews/getproduct/${product.productId}`);
      const data = await res.json();
      setReviews(data);
    };

    if (product?.productId) {
      fetchProductReviews();
    }
  }, [product?.productId]);

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
  
    const reviewData = {
      customerName: `${user?.user.firstName} ${user?.user.lastName}`,
      content: reviewContent,
      productId: product.productId,
      isWebsiteReview: false // Set this depending on your needs
    };
  
    try {
      const response = await fetch(`http://localhost:3001/reviews/Createproductreview/${product.productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result); // Check the server response
        // Potentially check for `result.status === 200` or another success condition based on your API
        setReviewContent('');
        // Re-fetch reviews to display the new one
        fetchProductReviews(); 
      } else {
        console.error('Failed to submit review, response status:', response.status);
      }
    } catch (error) {
      console.error('There was an error submitting the review:', error);
    }
  };

  const addToCart = async (productId) => {
    
    try {
      // setIsLoading(true)
      const userId = user.user.id
      let response = await fetch(`http://localhost:3001/cart/add/${userId}/${productId}`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          }
        })
      const resJson = await response.json();
      console.log(resJson)
    }
    catch (error) {
      // setIsLoading(true)
      console.log(error)
    }
  }

  return (
    <>
      <AppNavbar />
      <Container className="individual-p-container mt-5">
        <Row>
          <Col md={6}>
            <img src={product?.image} alt={product?.name} className="img-fluid rounded" />
          </Col>
          <Col md={6} className="product-details d-flex flex-column justify-content-center align-items-start">
            <h1>{product?.name}</h1>
            <p className="description">{product?.details}</p>
            
            <p className="price-p mb-4">£{product?.price}</p>
            <Link to="/addCart" onClick={() => addToCart(product.productId)}>
              <Button variant="primary" className="add-to-cart-btn">
                Add to Cart
              </Button>
            </Link>
          </Col>
        </Row>
        {/* Review Section Code */}
        <Row className="mt-4">
          <Col>
            <h3>Customer Reviews</h3>
            {reviews.length > 0 ? (
              <ListGroup>
                {reviews.map((review) => (
                  <ListGroup.Item key={review.id}>
                    
                    <strong>{review.customerName}</strong>
                    <p>{review.content}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p>No reviews yet. Be the first to write one!</p>
            )}
            {user?.user && (
              <Form onSubmit={handleReviewSubmit}>
                <Form.Group controlId="reviewContent">
                  <Form.Label>Write your review</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit Review
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default IndividualProduct;