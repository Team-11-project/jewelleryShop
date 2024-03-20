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
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewRating, setReviewRating] = useState(0);

  const fetchProductReviews = async () => {
    const res = await fetch(`http://localhost:3001/reviews/review/${product.productId}`);
    const data = await res.json();
    setReviews(data);
  };

  useEffect(() => {
    if (product?.productId) {
      fetchProductReviews();
    }
  }, [product?.productId]);

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
  
    const reviewData = {
      customerName: `${user?.firstName} ${user?.lastName}`,
      title: reviewTitle,
      content: reviewContent,
      productId: product.productId,
      rating: reviewRating,
      isWebsiteReview: false, 
      productProductId: product.productId, 
      userUserId: user?.userId 
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
        console.log(result); 
        
        setReviewContent('');
        setReviewTitle('');
        setReviewRating(0);
        fetchProductReviews(); 
      } else {
        console.error('Failed to submit review, response status:', response.status);
      }
    } catch (error) {
      console.error('There was an error submitting the review:', error);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      const response = await fetch(`http://localhost:3001/deleteReview/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (response.ok) {
        setReviews(reviews.filter((review) => review.id !== reviewId));
      } else {
        console.error('Failed to delete review, response status:', response.status);
      }
    } catch (error) {
      console.error('Error deleting review:', error);
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
          <Col md={6} className="product-details">
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
        <Row className="mt-4 review-section">
          <Col>
            <h3>Customer Reviews</h3>
            <ListGroup className="review-list">
              {reviews.map((review) => (
                <ListGroup.Item key={review.id} className="review-item">
                  {editingReviewId === review.id ? (
                    <Form onSubmit={(e) => {
                      e.preventDefault();
                      submitEdit(review.id);
                    }}>
                      <Form.Group controlId="editContent">
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                        />
                      </Form.Group>
                      <Button variant="secondary" onClick={() => setEditingReviewId(null)}>
                        Cancel
                      </Button>
                      <Button variant="primary" type="submit">
                        Save
                      </Button>
                    </Form>
                  ) : (
                    <>
                      <strong>{review.customerName}</strong>
                      <p>{review.content}</p>
                      {user?.user.id === review.userId && (
                        <div className="review-actions">
                          <Button variant="outline-primary" onClick={() => startEditing(review)}>
                            Edit
                          </Button>
                          <Button variant="outline-danger" onClick={() => handleDelete(review.id)}>
                            Delete
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
            {user && (
          <Form onSubmit={handleReviewSubmit} className="review-form">
            <Form.Group controlId="reviewTitle">
              <Form.Label>Review Title</Form.Label>
              <Form.Control
                type="text"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="reviewRating">
              <Form.Label>Rating out of 5</Form.Label>
              <Form.Control
                type="number"
                min="0"
                max="5"
                step="0.5"
                value={reviewRating}
                onChange={(e) => setReviewRating(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="reviewContent">
              <Form.Label>Write your review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="submit-review-btn">
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