import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './ViewProduct.css';

function ViewProduct({ product, closeDetailView }) {
  return (
    <div className="view-product-popup">
      <div className="view-product-popup-inner">
        <button className="close-btn" onClick={closeDetailView}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="view-product-content">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-info">Material: {product.material}</p>
          <p className="product-info">Price: £{product.price}</p>
          <p className="product-info">Stock Level: {product.stock}</p>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;