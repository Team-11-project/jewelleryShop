import React from 'react';
import './checkoutComplete.css';

const CheckoutComplete = () => {
    return (
        <div className="checkout-complete-container">
            <div className="thank-you-container">
                <h1>Thank You for Your Purchase!</h1>
                <p>Your order has been placed and is being processed.</p>
                <button onClick={() => window.location.href = '/'}>Return to homepage</button>
            </div>
        </div>
    );
};

export default CheckoutComplete;
