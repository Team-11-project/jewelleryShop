import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../../../../../Context/AuthContext';
import './DeleteProduct.css';

function DeleteProduct({ getDeletePop, chosenProd }) {
  let { authTokens } = useContext(AuthContext);

  const handlePop = (pop) => {
    getDeletePop(pop);
  };
//   console.log(chosenProd)


  console.log(chosenProd, "del")

  const handleDelete = async () => {
    const token = authTokens.token;
    console.log(chosenProd)
    console.log(chosenProd?.productId)
    try {
      const req = await fetch(`http://localhost:3000/products/${chosenProd?.productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
      const res = await req.json();
      if (res.status === 200) {
        alert('Your product has been deleted successfully')
      } 
      
      else {
        console.log(res.status);
        console.error('Delete request failed:', res.message);
        alert('Error deleting product. Please try again.');
      }
      handlePop(false);
    } 
    catch (error) {
      console.error('Error:', error.message);
      alert(`An unexpected error occurred. Please try again. ${error.message}`);
    }
  };

  return (
    <div className="delete-popup">
      <div className="delete-popup-inner">
        <button className="cancel-btn" onClick={() => handlePop(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <form onSubmit={handleDelete}>
          <div className="left-form">
          </div>
          <div className="right-form">
            <div className="form-item">
              <label>Are you sure you want to delete this product?</label>
            </div>
            <div className="submit-product">
              <button type="submit">Delete</button>
              <button type="button" onClick={() => handlePop(false)}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteProduct;