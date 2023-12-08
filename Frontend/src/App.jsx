import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './assets/navbar';
import Footer from './assets/footer';
import ProductsCustomer from './productsPage/products';  
import AddCart from './addCart/addCart';
import { AuthProvider } from './Context/AuthContext';
import Home from './homePage/home';
import Login from './Pages/Login/Login';
import ForgotPassword from './forgotPassword/forgotPassword';
import Dashboard from './AdminSide/Pages/Dashboard/Dashboard';
import Overview from './AdminSide/Pages/Dashboard/Overview/Overview';
import ProductsAdmin from './AdminSide/Pages/Dashboard/Products/Products';
import Signup from './Signup/Signup'
import AdminSignUp from './Signup/AdminSignUp'

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
            <Route path='/Signup' exact element={<Signup />}/>
            <Route path='/AdminSignUp' exact element={<AdminSignUp/>}/>
          </Routes>
        </AuthProvider>
      </Router>
  )
}

export default App;