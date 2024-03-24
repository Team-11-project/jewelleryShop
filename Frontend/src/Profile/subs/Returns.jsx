import React, { useState } from 'react';
import './Returns.css'; // Make sure your CSS matches the structure below.

const Returns = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [reason, setReason] = useState("");

  // Dummy data representing items that can be returned.
  const itemsToReturn = [
    {
      id: 1,
      name: 'Ring silver something',
      quantity: 1,
      price: '£2500',
      imageUrl: 'path/to/image', // Replace with actual image path or URL
    },
    // Add more items here if necessary.
  ];

  const handleReturn = () => {
    // Here you would normally call the backend to process the return.
    // For now, we'll just log to the console.
    console.log('Submitted return for item ID:', selectedItem, 'Reason:', reason);
  };

  return (
    <div className="returns-container">
      <h1>Returns</h1>
      <p>Select the item you wish to return and reason for return.</p>
      <div className="items-to-return">
        {itemsToReturn.map((item) => (
          <div key={item.id} className="return-item">
            <img src={item.imageUrl} alt={item.name} className="return-item-image" />
            <div className="item-info">
              <p className="item-name">{item.name}</p>
              <p>Qty: {item.quantity}</p>
              <p>{item.price}</p>
              <select 
                className="reason-for-return"
                value={selectedItem === item.id ? reason : ''}
                onChange={(e) => {
                  setSelectedItem(item.id);
                  setReason(e.target.value);
                }}
              >
                <option value="">Select reason for return</option>
                <option value="mistake">Bought by mistake</option>
                <option value="damaged">Damaged</option>
                <option value="noLongerNeeded">Item no longer needed</option>
                <option value="late">Item arrived too late</option>
                <option value="wrong">Wrong item was sent</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleReturn} className="proceed-btn">Proceed</button>
    </div>
  );
};

export default Returns;
