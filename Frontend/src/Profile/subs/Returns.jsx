import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import './Returns.css'; 

function Returns() {
    const { authTokens, user } = useContext(AuthContext);
    const [itemsToReturn, setItemsToReturn] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [reason, setReason] = useState("");
    console.log(user.user.id)
    const fetchItems = async () => {
        try {
            const response = await fetch(`http://localhost:3001/orders/${user.user.id}/returns`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authTokens.token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch items');
            }
            const data = await response.json();
            setItemsToReturn(data);
        } catch (error) {
            toast.error("Failed to fetch items to return");
        }
    };

    const handleReturn = async () => {
        if (!selectedItem || !reason) {
            toast.error("Please select an item and a reason for return");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/returns/${selectedItem}/status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.token}`
                },
                body: JSON.stringify({
                    reason: reason
                })
            });
            if (!response.ok) {
                throw new Error('Failed to submit return');
            }
            toast.success("Return submitted successfully");
            setItemsToReturn(itemsToReturn.filter(item => item.id !== selectedItem));
            setSelectedItem(null);
            setReason('');
            } catch (error) {
            console.error('Error submitting return:', error);
            toast.error("Failed to submit return");
            }
            };
            useEffect(() => {
                fetchItems();
            }, [authTokens.token, authTokens.userId]); 
            
            return (
                <>
                    <ToastContainer position="top-right" autoClose={5000} />
                    <div className="returns-container">
                        <h1>Returns</h1>
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

        export default Returns;            
