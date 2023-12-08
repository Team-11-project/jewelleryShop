import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './homePage/home';
import Login from './Pages/Login/Login';
import AppNavbar from './assets/navbar';
import Footer from './assets/footer';
import Products from './productsPage/products';
import AddCart from './addCart/addCart';
import { AuthProvider } from './Context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import ForgotPassword from './forgotPassword/forgotPassword';
import Dashboard from './AdminSide/Pages/Dashboard/Dashboard';
import Overview from './AdminSide/Pages/Dashboard/Overview/Overview';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faTh, faInfo, faStar } from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faTh, faInfo, faStar);

function App() {

  const currentURL = window.location.pathname
  console.log(currentURL)

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
          <Route path='/dashboard' exact element={<Dashboard />} />
          <Route path='/products' element={<Products />} />
          <Route path="/addCart" element={<AddCart />} />
        </Routes>
        {
          currentURL === "/dashboard" || "/login" || "/forgotPassword" ? <></> : <Footer />
        }
      </AuthProvider>
    </Router>
  );
}

export default App;