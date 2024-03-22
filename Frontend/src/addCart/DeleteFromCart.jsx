import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../Context/AuthContext';

function DeleteFromCart({ getDeletePop, chosenProduct, handleDeleteItem }) {
  const { authTokens, user } = useContext(AuthContext);

  const handlePop = (pop) => {
    getDeletePop(pop);
  };

  const handleDelete = async (e) => {
    e.preventDefault()
    const token = authTokens.token;
    const userid = user.user.id;

    //console.log(chosenProduct);
    try {
      const req = await fetch(`http://localhost:3001/cart/remove/${userid}/${chosenProduct.productId}`, {
        method: 'DELETE',
        headers: {
          //'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await req.json();

      handlePop(false);
    } catch (error) {
      console.error('Error:', error.message);
      alert(`An unexpected error occurred. Please try again. ${error.message}`);
    }
  };

  const deleteFromCart = async (cartProductId) => {
    // http://localhost:300/cart/add/userid/productid
    try {
      // setIsLoading(true)
      const userId = user.user.id
      let response = await fetch(`http://localhost:3001/cart/deleteFromCart/${userId}/${cartProductId}`,
        {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
          }
        })
      handlePop(false);
      // const resJson = await response.json();
    }
    catch (error) {
      // setIsLoading(true)
      console.log(error)
    }
  }

  return (
    <div className="delete-popup">
      <div className="delete-popup-inner">
        <button className="cancel-btn" onClick={() => handlePop(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <form onSubmit={deleteFromCart(chosenProduct.id)}>
          <div className="left-form"></div>
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
