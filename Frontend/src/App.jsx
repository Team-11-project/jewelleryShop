import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './homePage/home';
import About from './about us/about';
import Login from './Pages/Login/Login';
import Contact from './Contact Us/contact';
import AppNavbar from './assets/navbar';
import Footer from './assets/footer';
import Products from './productsPage/products';
import AddCart from './addCart/addCart';
import { AuthProvider } from './Context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import ForgotPassword from './forgotPassword/forgotPassword';
import Dashboard from './AdminSide/Pages/Dashboard/Dashboard';
import Overview from './AdminSide/Pages/Dashboard/Overview/Overview';
import IndividualProduct from './productsPage/individualProducts';
import AddCartPage from './addCart/addCartPage';

import CheckoutPage from './Checkout/checkout';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faTh, faInfo, faStar } from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faTh, faInfo, faStar);
import CheckoutPage from './Checkout/checkout';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppNavbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgotPassword' exact element={<ForgotPassword />} />
          <Route path='/dashboard' exact element={<Dashboard />} />
          <Route path='/checkout' exact element={<CheckoutPage />} />
          <Route path='/products' element={<Products />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path="/addCart" element={<AddCart />} />
          <Route path='/product/:productId' element={<IndividualProduct />} />
          <Route path="/addCartPage" element={<AddCartPage />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  )
  }
export default App;