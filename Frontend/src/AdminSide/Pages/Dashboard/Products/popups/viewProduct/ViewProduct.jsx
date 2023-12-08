import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ViewProduct({ product, closeDetailView }) {
  return (
    <div className="view-product-popup">
      <div className="view-product-popup-inner">
        <button className="close-btn" onClick={closeDetailView}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="view-product-content">
          <h2>{product.name}</h2>
          <p>Material: {product.material}</p>
          <p>Price: £{product.price}</p>
          <p>Stock Level: {product.stock}</p>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;