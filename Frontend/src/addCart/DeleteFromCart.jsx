import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../Context/AuthContext';

function DeleteFromCart({ getDeletePop, chosenProduct, handleDeleteItem }) {
  const { authTokens } = useContext(AuthContext);

  const handlePop = (pop) => {
    getDeletePop(pop);
  };

  const handleDelete = async () => {
    const token = authTokens.token;

    try {
      const req = await fetch(`http://localhost:3000/products/${chosenProduct.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await req.json();

      if (res.status === 200) {
        handleDeleteItem(chosenProduct.id);
      } else {
        console.error('Delete request failed:', res.message);
        alert('Error deleting product. Please try again.');
      }

      handlePop(false);
    } catch (error) {
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
              <label>Are you sure you want to delete this item from your cart?</label>
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

export default DeleteFromCart;
