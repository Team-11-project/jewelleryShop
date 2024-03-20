import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './homePage/home';
// import About from './about us/about';
import Login from './Pages/Login/Login';
import Contact from './Contact Us/contact';
import AppNavbar from './assets/navbar';
import Footer from './assets/footer';
import Products from './productsPage/products';
import AddCart from './addCart/addCart';
import { AuthProvider } from './Context/AuthContext';
import ForgotPassword from './forgotPassword/forgotPassword';
import ResetPassword from './resetPassword/resetPassword';
import Dashboard from './AdminSide/Pages/Dashboard/Dashboard';
import Overview from './AdminSide/Pages/Dashboard/Overview/Overview';
import IndividualProduct from './productsPage/individualProducts';
import AddCartPage from './addCart/addCartPage';
import Checkout from './Checkout/checkout';
import ProductsAdmin from './AdminSide/Pages/Dashboard/Products/Products';
import Signup from './Signup/Signup'
import AdminSignUp from './Signup/AdminSignUp'
import CheckoutComplete from './Checkout/checkoutComplete';
import Orders from './AdminSide/Pages/Dashboard/Orders/Orders';
import OrderDetails from './AdminSide/Pages/Dashboard/Orders/orderDetails.jsx';
import Profile from './menuPages/menu.jsx';
import Myinfo from './menuPages/myinfo.jsx';
import OrderHistory from './menuPages/history.jsx'
// import Profile from './menuPages/pages/history.jsx'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faTh, faInfo, faStar } from '@fortawesome/free-solid-svg-icons';
import AboutSection from './about us/about.jsx';
import AboutUs from './about us/about.jsx';
import ProfilePage from './Profile/ProfilePage.jsx';

library.add(faHome, faTh, faInfo, faStar);

function App() {

  const currentURL = window.location.pathname
  // console.log(currentURL)

  return (
    <Router>
      <AuthProvider>
        {/* {
          currentURL === "/dashboard" || "/login" || "/forgotPassword" ? <></> : <AppNavbar />
        } */}
        {/* {
          currentURL === "/" ? <AppNavbar /> : <></>
        } */}

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgotPassword' exact element={<ForgotPassword />} />
          <Route path='/ResetPassword' exact element={<ResetPassword />} />
          <Route path='/dashboard' exact element={<Dashboard />} />
          <Route path='/checkout' exact element={<Checkout />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/myProfile' element={<ProfilePage />} />
          <Route path='/my-info' element={<Myinfo />} />
          <Route path='/order-history' element={<OrderHistory />} />
          <Route path='/products' element={<Products />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path="/addCart" element={<AddCart />} />
          <Route path='/product/:productId' element={<IndividualProduct />} />
          <Route path="/cart" element={<AddCartPage />} />
          <Route path='/Signup' exact element={<Signup />} />
          <Route path='/AdminSignUp' exact element={<AdminSignUp />} />
          <Route path='/CheckoutComplete' exact element={<CheckoutComplete />} />
          <Route path='/orderDetails/:orderId' element={<OrderDetails />} />
        </Routes>
        {
          (currentURL === "/dashboard" || currentURL === "/login" || currentURL === "/forgotPassword") ? <></> : <Footer />
        }
      </AuthProvider>
    </Router>
  )
}
export default App;