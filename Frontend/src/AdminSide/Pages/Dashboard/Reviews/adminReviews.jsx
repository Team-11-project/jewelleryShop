import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../../Context/AuthContext';
import './adminReviews.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminReviews = () => {
  const { authTokens } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:3001/reviews/getallreviews', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.token}`, 
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        toast.error('Error fetching reviews');
      }
    };

    fetchReviews();
  }, [authTokens]);

  const deleteReview = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/reviews/deleteReview/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authTokens.token}`, 
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete review');
      }
      toast.success('Review deleted successfully');
      setReviews(reviews.filter(review => review.id !== id));
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Error deleting review');
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="admin-reviews-container">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id} className="admin-review-item">
              <h4 className="admin-review-name">{review.customerName} </h4>
              <h5 className="admin-review-title">{review.title}</h5>
              <div className="admin-review-description">{review.content}</div>
              <div className="admin-review-rating">
                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
              </div>
              <div className="admin-review-actions">
                <button onClick={() => deleteReview(review.id)} className="admin-review-delete-btn">
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews found.</p>
        )}
      </div>
    </>
  );
};

export default AdminReviews;
