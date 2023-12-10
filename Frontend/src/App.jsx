import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom';
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

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faTh, faInfo, faStar } from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faTh, faInfo, faStar);

const MainLayout = ({ children }) => (
  <>
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={<MainLayout><Home /></MainLayout>}
          />
          <Route path='/login' element={<MainLayout><Login /></MainLayout>} />
          <Route path='/forgotPassword' exact element={<MainLayout><ForgotPassword /></MainLayout>} />
          <Route path='/dashboard' exact element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path='/products' element={<MainLayout><Products /></MainLayout>} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<MainLayout><About /></MainLayout>} />
          <Route path="/addCart" element={<MainLayout><AddCart /></MainLayout>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
