import React, { useContext, useEffect, useState } from 'react';
import './adminReviews.css'; 
import Navbar from '../../navbar/navbar';
import SideNav from '../../sideNav/sideNav';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([
    { id: 1, name: 'John Cube', rating: 5, review: 'The necklace looks amazing!' },
    { id: 2, name: 'Robert Mark', rating: 2, review: 'The necklace was disappointing.' },
    // ...more dummy data
  ]);
  
  // Replace the following with actual fetch request when ready
  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     const response = await fetch('http://localhost:3001/reviews/getallreviews'); 
  //     const data = await response.json();
  //     setReviews(data);
  //   };
  //   fetchReviews();
  // }, []);

  const deleteReview = async (id) => {
    // Actual delete request logic goes here
    console.log('Delete review with ID:', id);
    // Mocking the delete functionality
    setReviews(reviews.filter(review => review.id !== id));
  };

  return (
    <>
      <Navbar />
      <SideNav />
      <div className="admin-reviews-container">
        {reviews.map((review) => (
          <div key={review.id} className="admin-review-item">
            <div className="admin-review-header">
              <div className="admin-reviewer-name">{review.name}</div>
              <div className="admin-review-rating">
                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
              </div>
            </div>
            <div className="admin-review-text">{review.review}</div>
            <div className="admin-review-actions">
              <button onClick={() => deleteReview(review.id)} className="admin-review-delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminReviews;
