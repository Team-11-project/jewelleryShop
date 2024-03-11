import React, { useState, useEffect } from "react";
import "./Orders.css";

const Orders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filter, setFilter] = useState(""); 

  useEffect(() => {
    fetchOrdersData();
  }, []);

  const fetchOrdersData = async () => {
    try {
      const response = await fetch('http://localhost:3001/cart/getAllOrders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      
      const data = await response.json();

      setOrdersData(data);
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching orders data:", error);
    }
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterOrders(term, filter);
  };

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    setFilter(filterValue);
    filterOrders(searchTerm, filterValue);
  };

  const filterOrders = (term, filterValue) => {
    let filteredOrders = ordersData;

    if (term) {
      filteredOrders = filteredOrders.filter((order) =>
        Object.values(order).some((value) =>
          value.toString().toLowerCase().includes(term.toLowerCase())
        )
      );
    }

    if (filterValue) {
      filteredOrders = filteredOrders.filter((order) => order.status === filterValue);
    }

    setSearchResults(filteredOrders);
  };

  return (
    <div className="orders-container">
      <div className="search-filter-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select className="filter-select" value={filter} onChange={handleFilterChange}>
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
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((order) => (
            <tr key={order.id}>
              <td>{order.serialNumber}</td>
              <td>{order.orderId}</td>
              <td>{order.status}</td>
              <td>{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;