import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Checkout from './Checkout/checkout';
import NewCategory from './AdminSide/Pages/Dashboard/Products/popups/newCategory/newCategory';
import EditCategory from './AdminSide/Pages/Dashboard/Products/popups/editCategory/editCategory';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faTh, faInfo, faStar } from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faTh, faInfo, faStar);


function App() {
  return (
    <Router>
      <AuthProvider>
        <AppNavbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
           <Route path='/forgot-password' exact element={<ForgotPassword />} />
            <Route path='/dashboard' exact element={<Dashboard />} />
            <Route path='/checkout' exact element={<Checkout />} />
            <Route path='/new-category' exact element={<NewCategory />} />
            <Route path='/edit-category' exact element={<EditCategory />} />
          </Routes>
        </AuthProvider>
      </Router>
  )
}

export default App;