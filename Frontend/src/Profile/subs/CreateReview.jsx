import React, { useState, useEffect } from 'react';
import './CreateReview.css'
import { ToastContainer, toast } from 'react-toastify'; 
function CreateReview({getIsReview, item, user }) {
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const notify = (message) => toast(message, { position: "bottom-left" });


  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    const reviewData = {
      customerName: user?.user?.firstName === user?.user?.lastName ? user?.user?.firstName : `${user?.user?.firstName} ${user?.user?.lastName}`,
      title: reviewTitle,
      content: reviewContent,
      productId: item.productId,
      rating: reviewRating,
      isWebsiteReview: false,
      userUserId: user?.userId
    };

    try {
      const response = await fetch(`http://localhost:3001/reviews/CreateReview/${item.productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      const result = await response.json();
      if (result.status == 200) {
        getIsReview(false);
        //response.message
        notify(result.message);
        setReviewContent('');
        setReviewTitle('');
        setReviewRating(0);
      } else {
        console.error('Failed to submit review, response status:', response.status);
        notify(result.message);
      }
    } catch (error) {
      console.error('There was an error submitting the review:', error);
    }
  };

  return (
    <div className="createReviewContainer">
      <ToastContainer />
      <div className="createReviewBox">
        <form onSubmit={handleReviewSubmit}>
          <label>
            Review Title:
            <input type="text" value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)} />
          </label>
          <label>
            Rating out of 5:
            <input type="number" min="0" max="5" step="0.5" value={reviewRating} onChange={(e) => setReviewRating(e.target.value)} />
          </label>
          <label>
            Write your review:
            <textarea value={reviewContent} onChange={(e) => setReviewContent(e.target.value)} />
          </label>
          <button type="submit">Submit Review</button>
        </form>
        <button onClick={() => {getIsReview(false)}}>Close</button>
      </div>
    </div>
  );
}

export default CreateReview;