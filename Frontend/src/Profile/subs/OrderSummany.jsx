import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import CreateReview from './CreateReview';
import Returns from './CreateReturns'; // Make sure you have imported Returns component

function OrderSummany({ order, getView }) {
  const [isReview, setIsReview] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [showReturns, setShowReturns] = useState(false);
  const imgPath = '../../../src/assets/';

  const ItemBox = (item) => {
    return (
      <>
        <div className="itemContainer">
          <img src={imgPath + item?.product?.image} alt="product image" />
          <div className="infoSide">
            <button className='reviewCreate' onClick={() => { setSelectedItem(item); setIsReview(true); }}>Create Review</button>
            <p>Qty: {item.qty}</p>
          </div>
        </div>
      </>
    );
  };

  if (isReview) {
    return <CreateReview getIsReview={setIsReview} item={selectedItem?.product} />;
  }

  if (showReturns) {
    return <Returns order={order} closeReturns={() => setShowReturns(false)} />;
  }

  return (
    <>
      <div className="viewOrderPopContainer">
        <div className='viewOrderPop'>
          <div className="upper">
            <div className="displayT">
              <div className="">Your Order</div>
              <div className="" onClick={() => getView(false)}>
                <FontAwesomeIcon icon={faChevronLeft} /> All Orders
              </div>
            </div>
            <div className="orderNumber">
              <p>Order Number: #{order?.id}</p>
              <button onClick={() => setShowReturns(true)}>Create Return</button>
            </div>
          </div>
          <div className="mid">
            <p>Items in your Order:</p>
            <div className="items">
              {order?.cartProducts && order.cartProducts.map(item => (
                <div key={item.id}>
                  {ItemBox(item)}
                </div>
              ))}
            </div>
          </div>
          <div className="bottom">
            <div className="total">Status: {order?.status}</div>
            <div className="address">Address: {order?.address}, {order?.city}, {order?.postcode}, {order?.country}</div>
            <div className="total">Order Total: £{order?.totalPrice}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderSummany;
