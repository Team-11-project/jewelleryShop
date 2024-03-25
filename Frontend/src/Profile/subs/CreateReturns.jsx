import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import './CreateReturns.css'; 

function CreateReturns({ order }) {
    const { authTokens } = useContext(AuthContext);
    const [itemsToReturn, setItemsToReturn] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [reason, setReason] = useState("");

    useEffect(() => {
        if (order && order.cartProducts) {
            
            const transformedItems = order.cartProducts.map(product => ({
                id: product.product.productId,
                name: product.product.name,
                quantity: product.qty,
                price: product.product.price,
                imageUrl: product.product.image, 
            }));
            setItemsToReturn(transformedItems);
        }
    }, [order]);
    
    // Handle return submission
    const handleReturn = async () => {
        if (!selectedItem || !reason) {
            toast.error("Please select an item and a reason for return");
            return;
        }
        const requestBody = {
          orderId: order.id, // The ID of the order for which the return is being created
          returnedProducts: [selectedItem], // Array of product IDs being returned
          dateCreated: new Date(), // Current date
          totalPrice: order.totalPrice, // The total price of the returned items
          status: 'pending' // The initial status of the return
      };
        
      try {
        const response = await fetch(`http://localhost:3001/orders/${order.id}/returns`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.token}`
            },
            body: JSON.stringify(requestBody)
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to submit return');
      }
            const result = await response.json();
            toast.success("Return submitted successfully");
        } catch (error) {
            console.error('Error submitting return:', error);
            toast.error("Failed to submit return");
        }
    };
            return (
                <>
                    <ToastContainer position="top-right" autoClose={5000} />
                    <div className="returns-container">
                        <h2>What would you like to return?</h2>
                        <p>Select the item you wish to return and the reason for return.</p>
                        <div className="items-to-return">
                            {itemsToReturn.map((item) => (
                                <div key={item.id} className="return-item">
                                    <img src={item.imageUrl} alt={item.name} className="return-item-image" />
                                    <div className="item-info">
                                        <p className="item-name">{item.name}</p>
                                        <p>Qty: {item.quantity}</p>
                                        <p>Price: {item.price}</p>
                                        <select 
                                            className="return-reason-select"
                                            value={selectedItem === item.id ? reason : ''}
                                            onChange={(e) => {
                                                setSelectedItem(item.id);
                                                setReason(e.target.value);
                                            }}
                                        >
                                            <option value="">Select reason for return</option>
                                            <option value="damaged">Damaged item</option>
                                            <option value="noLongerNeeded">Item no longer needed</option>
                                            <option value="late">Item arrived too late</option>
                                            <option value="wrong">Wrong item was sent</option>
                                            <option value="mistake">Bought by mistake</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {itemsToReturn.length > 0 && (
                            <div className="proceed-button-container">
                                <button onClick={handleReturn} className="proceed-btn">Proceed</button>
                            </div>
                        )}
                    </div>
                </>
            );
        }

        export default CreateReturns; 
