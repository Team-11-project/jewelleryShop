import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function OrderSummany({ order, getView }) {
    // console.log(order)
    const imgPath = '../../../src/assets/'

    const items = order?.cartProducts

    // const 

    const ItemBox = (item) => {
        // console.log(item, "item")
        return (
            <>
                <div className="itemContainer">
                    <img src={imgPath + item?.product?.image} alt="product image" />
                    <div className="infoSide">
                        {/* <p>{item?.product?.name}</p>
                        <p>Price: £{item?.product?.price}</p> */}
                        <button className='reviewCreate'>create review</button>
                        <p>Qty: {item.qty}</p>
                    </div>

                </div>
            </>
        )

    }
    // console.log(order, "summary page")
    return (
        <>
            <div className="viewOrderPopContainer">
                <div className='viewOrderPop'>
                    <div className="upper">
                        <div className="displayT">
                            <div className="">Your Order</div>
                            <div className="" onClick={() => { getView(false) }}> <FontAwesomeIcon icon={faChevronLeft} /> All Orders</div>
                        </div>
                        <div className="orderNumber">
                            <p>Order Number: #{order?.id}</p>
                            <button>Create Return</button>
                        </div>
                    </div>
                    <div className="mid">
                        <p>Items in your Order:</p>
                        <div className="items">
                            {items && (
                                <>
                                    {items.map(item => (
                                        <div className="" key={item.id}>
                                            {ItemBox(item)}
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="total">Status: {order?.status} </div>
                        <div className="address">Address: {order?.address}, {order?.city}, {order?.postcode}, {order?.country}</div>
                        <div className="total">Order Total: £{order.totalPrice}</div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default OrderSummany