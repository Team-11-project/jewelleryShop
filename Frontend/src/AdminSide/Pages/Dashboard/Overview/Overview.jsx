/*
import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faRightLeft, faSterlingSign, faStore, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import './overviewStyles.css';
import AuthContext from '../../../../Context/AuthContext';


// Simulated data for the sales chart
const salesData = [
  { name: 'Mon', sales: 2400 },
  { name: 'Tue', sales: 1398 },
  { name: 'Wed', sales: 9800 },
  { name: 'Thu', sales: 3908 },
  { name: 'Fri', sales: 4800 },
  { name: 'Sat', sales: 3800 },
  { name: 'Sun', sales: 4300 },
];

const recentOrders = [
  { id: '304982', status: 'Pending', date: '10/10/24', total: '10,000', qty: 5, customer: 'Johnson Johnson' },
  { id: '304983', status: 'In Progress', date: '10/11/24', total: '8,500', qty: 3, customer: 'Avery Stewart' },
  { id: '304984', status: 'Returned', date: '10/09/24', total: '15,000', qty: 7, customer: 'Madison Smith' },
  { id: '304985', status: 'Delivered', date: '10/08/24', total: '12,000', qty: 6, customer: 'Evelyn Jones' },
  { id: '304986', status: 'Returned', date: '10/07/24', total: '9,000', qty: 4, customer: 'James Brown' },
];

const recentReviews = [
  { userName: 'Alice Johnson', date: '10/10/2024', rating: 5, comment: 'Excellent product, very satisfied!' },
  { userName: 'Bob Smith', date: '10/09/2024', rating: 4, comment: 'Good quality, but took a while to arrive.' },
  { userName: 'Charlie Davis', date: '10/08/2024', rating: 3, comment: 'Decent product, but not what I expected.' },
];

function Overview() {
  let {authTokens} = useContext(AuthContext)  
  const totalSales = 100000;
  const orders = 0;
  const returns = 0;
  const products = 100;
  const [data, setData] = useState({})

  const Overview1 = async () => {
    try {
        let response = await fetch(`http://localhost:3001/orders/dash/getDashboardCardsData`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //Authorization: `Bearer ${token}`,
            },
        });
        const resJson = await response.json();
        if (resJson.status === 200) {
          console.log(resJson.response)
            setData(resJson.response);
        } else {
            console.log(resJson);
            //notify('error: ' + resJson.message);
        }
    } catch (error) {
        console.log(error);
    }
};

const fetchOrdersData1 = async () => {
  try {
    const token = authTokens.token;
    const response = await fetch("http://localhost:3001/products/get-all-products", {
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

useEffect(() => {Overview1()},[])

  // Inline TopProducts component
  const topProductsData = [
    { id: 1, name: 'Product 1', sales: 2040 },
    { id: 2, name: 'Product 2', sales: 1860 },
    { id: 3, name: 'Product 3', sales: 1700 },
    // ... other products
  ];

  const getStatusColor = status => {
    switch (status) {
      case 'Pending': return 'orange';
      case 'In Progress': return 'blue';
      case 'Returned': return 'red';
      case 'Delivered': return 'green';
      default: return 'grey';
    }
  };

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={i < rating ? faStarSolid : faStarRegular}
          className={i < rating ? 'star' : 'star-o'}
        />
      );
    }
    return <div className="stars">{stars}</div>;
  };

  return (
    <>
      <div className="topSection">
        <div className="metric">
          <div className="info">
            <p>Total Sales</p>
            <p>£{data?.totalSales}</p>
          </div>
          <div className="icon-side">
            <FontAwesomeIcon icon={faSterlingSign} className="metric-icon" />
          </div>
        </div>
        <div className="metric">
          <div className="info">
            <p>Orders</p>
            <p>{data?.totalOrders}</p>
          </div>
          <div className="icon-side">
            <FontAwesomeIcon icon={faCartShopping} className="metric-icon orders" />
          </div>
        </div>
        <div className="metric">
          <div className="info">
            <p>Returns</p>
            <p>{returns}</p>
          </div>
          <div className="icon-side">
            <FontAwesomeIcon icon={faRightLeft} className="metric-icon returns" />
          </div>
        </div>
        <div className="metric">
          <div className="info">
            <p>Products</p>
            <p>{products}</p>
          </div>
          <div className="icon-side">
            <FontAwesomeIcon icon={faStore} className="metric-icon products" />
          </div>
        </div>
      </div>

      <div className="middleSection">
        <div className="sP">
          <ResponsiveContainer width="100%" aspect={4 / 3}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="tP">
        <h3>Top Products</h3>
          <div className="topProducts">
            {topProductsData.map(product => (
              <div key={product.id} className="product">
                <div className="product-image-placeholder"></div>
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p>£{product.sales.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bottomSection">
        <div className="recentOrdersSection">
          <div className="sectionHeader">
            <h3>Recent Orders</h3>
            <FontAwesomeIcon icon={faEllipsisV} />
          </div>
          <table className="ordersTable">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Status</th>
                <th>Date</th>
                <th>Total</th>
                <th>Product QTY</th>
                <th>Customer</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    <FontAwesomeIcon icon={faCircle} className="statusIcon" style={{color: getStatusColor(order.status)}} />
                    {order.status}
                  </td>
                  <td>{order.date}</td>
                  <td>£{order.total}</td>
                  <td>{order.qty}</td>
                  <td>{order.customer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="recentReviewsSection">
          <h3>Recent Reviews</h3>
          <div className="reviewsContainer">
            {recentReviews.map((review, index) => (
              <div key={index} className="reviewCard">
                <div className="reviewUser">
                  <span className="reviewUserName">{review.userName}</span>
                  <span className="reviewDate">{review.date}</span>
                </div>
                <div className="reviewComment">{review.comment}</div>
                <div className="reviewRating">{renderStars(review.rating)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Overview;
*/