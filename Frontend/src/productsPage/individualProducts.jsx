import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, ListGroup } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import './individualProducts.css';
import AppNavbar from '../assets/navbar';
import AuthContext from '../Context/AuthContext';
import ImageZoomComponent from '../assets/ImageZoomComponent';
import { ToastContainer, toast } from 'react-toastify';
import Footer from '../assets/footer';

function IndividualProduct() {
  const imgPath = "../../src/assets/"
  const notify = (message) => toast(message);

  const location = useLocation();
  const product = location.state;
  let { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [reviewContent, setReviewContent] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [status, setStatus] = useState({
    message: "",
    color: ""
  })

  const style = {
    color: status.color
  }

  const StockStatus = (product) => {

    const stock = product?.stock
    if (stock > 1 && stock <= 5) {
      setStatus({
        message: stock + " left in stock ",
        color: "orange"
      })

    }
    else if (stock > 5) {
      setStatus({
        message: "In Stock",
        color: "green"
      })

    }
    else {
      setStatus({
        message: "Out Of Stock",
        color: "red"
      })

    }
  }

  const fetchProductReviews = async () => {
    const res = await fetch(`http://localhost:3001/reviews/review/${product.productId}`);
    const data = await res.json();
    setReviews(data);
  };

  useEffect(() => {
    if (product?.productId) {
      fetchProductReviews();
    }
    StockStatus(product)
  }, [product?.productId]);

  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    const reviewData = {
      customerName: user?.user?.firstName === user?.user?.lastName ? user?.user?.firstName : `${user?.user?.firstName} ${user?.user?.lastName}`,
      title: reviewTitle,
      content: reviewContent,
      productId: product.productId,
      rating: reviewRating,
      isWebsiteReview: false,
      productProductId: product.productId,
      userUserId: user?.userId
    };

    try {
      const response = await fetch(`http://localhost:3001/reviews/CreateReview/${product.productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        const result = await response.json();
        // console.log(result);

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

  // const startEditing = (review) => {
  //   if (user && user.userId === review.userUserId) {
  //     setEditingReviewId(review.id);
  //     setEditingContent(review.content);
  //   }
  // };

  // const submitEdit = async (reviewId) => {
  //   if (user) {
  //     const reviewData = {
  //       title: reviewTitle,
  //       content: editingContent,
  //       rating: reviewRating,
  //       isWebsiteReview: false,
  //     };

  //     try {
  //       const response = await fetch(`http://localhost:3001/reviews/updateReview/${reviewId}`, {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(reviewData),
  //       });

  //       if (response.ok) {
  //         setEditingReviewId(null);
  //         fetchProductReviews(); 
  //       } else {
  //         console.error("Failed to edit review");
  //       }
  //     } catch (error) {
  //       console.error('There was an error editing the review:', error);
  //     }
  //   }
  // };

  // const handleDelete = async (reviewId) => {
  //   if (user) {
  //     const response = await fetch(`http://localhost:3001/reviews/deleteReview/${reviewId}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response.ok) {
  //       setReviews(reviews.filter((review) => review.id !== reviewId));
  //     } else {
  //       console.error("Failed to delete review");
  //     }
  //   }
  // }        


  const addToCart = async (productId) => {
    // http://localhost:3001/cart/add/userid/productid
    try {
      // setIsLoading(true)
      const userId = user.user.id
      let response = await fetch(`http://localhost:3001/cart/add/${userId}/${productId}/1`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          }
        })
      const resJson = await response.json();
      // if (resJson.status == 200) {
      notify(resJson.message)
      // }
    }
    catch (error) {
      // setIsLoading(true)
      console.log(error)
    }
  }

  return (
    <>
      <AppNavbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <Container className="individual-p-container mt-5">
        <Row>
          <Col md={6}>
            <ImageZoomComponent image={imgPath + product?.image} />
            {/* <img src={imgPath + product?.image} alt={product?.name} className="img-fluid rounded" /> */}
          </Col>
          <Col md={6} className="product-details">
            <h1>{product?.name}</h1>
            <p className="description">{product?.details}</p>
            <p className="price-p mb-4">£{product?.price}</p>

            <p style={style}>{status.message}</p>
            {
              product?.stock < 1
                ?
                <Button variant="danger" className="add-to-cart-btn" active disabled>
                  Out Of stock
                </Button>
                :
                // <Link to="/addCart" onClick={() => addToCart(product.productId)}>
                <Button variant="primary" className="add-to-cart-btn" onClick={() => addToCart(product.productId)}>
                  Add to Cart
                </Button>
              // </Link>

            }

          </Col>
        </Row>
        <Row className="mt-4 review-section">
          <Col>
            <h3>Customer Reviews</h3>
            <ListGroup className="review-list">
              {reviews.length > 0
                ?
                <>
                  {reviews.map((review) => (
                    <ListGroup.Item key={review.id} className="review-item">
                      <strong>{review.customerName}</strong>
                      <div>
                        <strong>{review.title}</strong>
                      </div>
                      <div>
                        {review.content}
                      </div>
                      <div>
                        Rating: {review.rating}
                      </div>
                    </ListGroup.Item>
                  ))}
                </>
                :
                "No reviews for this product yet"}

            </ListGroup>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default IndividualProduct;