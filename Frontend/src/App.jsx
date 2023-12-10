import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import Checkout from './Checkout/checkout';
import NewCategory from './AdminSide/Pages/Dashboard/Products/popups/newCategory/newCategory';
import EditCategory from './AdminSide/Pages/Dashboard/Products/popups/editCategory/editCategory';
import IndividualProduct from './productsPage/individualProducts'
import AddCartPage from './addCart/addCartPage'
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
          <Route path='/forgot-password' exact element={<ForgotPassword />} />
          <Route path='/dashboard' exact element={<Dashboard />} />
          <Route path='/products' element={<Products />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path="/addCart" element={<AddCart />} />
          <Route path='/product/:productId' element={<IndividualProduct />} />
          <Route path="/addCartPage" element={<AddCartPage />} />
            <Route path='/checkout' exact element={<Checkout />} />
            <Route path='/new-category' exact element={<NewCategory />} />
            <Route path='/edit-category' exact element={<EditCategory />} />
        </Routes>
        {
          currentURL === "/dashboard" || "/login" || "/forgotPassword" ? <></> : <Footer />
        }
      </AuthProvider>
    </Router>
  )
}
export default App;