import React, { useContext, useEffect, useState } from 'react';
import './subs.css';
import AuthContext from '../../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyReturns() {
    const { user, authTokens } = useContext(AuthContext);
    const [returns, setReturns] = useState([]);

    useEffect(() => {
        const fetchReturns = async () => {
            try {
                const response = await fetch(`http://localhost:3001/orders/user/${user.user.id}/returns`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${authTokens.token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) throw new Error('Failed to fetch returns');
                const data = await response.json();
                setReturns(data.response);
            } catch (error) {
                console.error('Error fetching returns:', error);
                toast.error("Failed to fetch returns");
            }
        };

        if (user?.user?.id) {
            fetchReturns();
        }
    }, [user?.user?.id, authTokens.token]);

    const ReturnComponent = ({ returnItem }) => {
        const order = returnItem.order; // Assuming the return item includes order details
        // Further assuming each order includes cartProducts or similar with product details
        return (
            <div className="reviewContainer" key={returnItem.id}>
                <div className="le">
                    {order && (
                        <>
                            <p>Order Number: {order.id}</p>
                            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p>Total: £{order.totalPrice}</p>
                            <p>Order Status: {order.status}</p>
                            {order.cartProducts && order.cartProducts.map((product, index) => (
                                <div key={index} className="productDetails">
                                    <img src={`../../../src/assets/${product.product.image}`} alt="Product" style={{ width: '100px', height: '100px' }} />
                                    <p>{product.product.name}</p>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="displayT">My Returns</div>
            <div className="reviews">
                {returns.length > 0 ? (
                    returns.map((returnItem) => <ReturnComponent key={returnItem.id} returnItem={returnItem} />)
                ) : (
                    <p>No returns found.</p>
                )}
            </div>
        </>
    );
}

export default MyReturns;
