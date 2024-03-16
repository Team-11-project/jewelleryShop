import React, { useState } from "react";
import "./Orders.css";

const Orders = () => {
  const ordersData = [
    { id: 1, serialNumber: 1, orderId: "#30498", status: "Pending", date: "10/10/24" },
    { id: 2, serialNumber: 2, orderId: "#30499", status: "In Progress", date: "10/10/24" },
    { id: 3, serialNumber: 3, orderId: "#30500", status: "Returned", date: "10/10/24" },
    { id: 4, serialNumber: 4, orderId: "#30501", status: "Delivered", date: "10/10/24" }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(ordersData);
  const [filter, setFilter] = useState(""); 

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