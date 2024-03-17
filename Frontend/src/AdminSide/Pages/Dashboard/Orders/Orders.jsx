import React, { useState, useEffect, useContext } from "react";
import "./Orders.css";
import OrderDetails from './orderDetails';
import AuthContext from '../../../../Context/AuthContext';

const Orders = () => {
  const { authTokens } = useContext(AuthContext);
  const [ordersData, setOrdersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filter, setFilter] = useState("");
  const [orderDetailsPop, setOrderDetailsPop] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    fetchOrdersData();
  }, []);

  const fetchOrdersData = async () => {
    try {
      const token = authTokens.token;
      const response = await fetch("http://localhost:3001/cart/getAllOrders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setOrdersData(data.response);
      setSearchResults(data.response);
    } catch (error) {
      console.error("Error fetching orders data:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterOrders(event.target.value, filter);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    filterOrders(searchTerm, event.target.value);
  };

  const filterOrders = (term, filterStatus) => {
    const lowercasedTerm = term.toLowerCase();
    let filteredOrders = ordersData;

    if (term) {
      filteredOrders = filteredOrders.filter((order) => 
        order.id.toString().toLowerCase().includes(lowercasedTerm) ||
        order.status.toLowerCase().includes(lowercasedTerm) ||
        order.totalPrice.toString().toLowerCase().includes(lowercasedTerm) ||
        new Date(order.createdAt).toLocaleDateString().toLowerCase().includes(lowercasedTerm)
      );
    }

    if (filterStatus && filterStatus !== "") {
      filteredOrders = filteredOrders.filter((order) => 
        order.status.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    setSearchResults(filteredOrders);
  };

  const getStatusClassName = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'in progress':
        return 'status-inprogress';
      case 'returned':
        return 'status-returned';
      case 'delivered':
        return 'status-delivered';
      default:
        return '';
    }
  };

  const openOrderDetails = (orderId) => {
    setSelectedOrderId(orderId);
    setOrderDetailsPop(true);
  };

  const closeOrderDetails = () => {
    setOrderDetailsPop(false);
  };

  return (
    <>
      {orderDetailsPop && selectedOrderId && (
        <OrderDetails orderId={selectedOrderId} closePopup={closeOrderDetails} />
      )}
    
      <div className="orders-container">
        {/* Search and filter UI */}
        <div className="search-filter-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <select
            className="filter-select"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Returned">Returned</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        <table className="orders-table">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Order ID</th>
              <th>Status</th>
              <th>Total</th>
              <th>Date</th>
              <th>More</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{order.id}</td>
                <td>
                  <span className={`status-tag ${getStatusClassName(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td>{"£" + order.totalPrice}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => openOrderDetails(order.id)} className="details-button">
                  &gt;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Orders;