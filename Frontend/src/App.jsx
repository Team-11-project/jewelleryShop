import { useState } from 'react'
import { BrowserRouter as Router, Routes, useLocation } from 'react-router-dom'
import { Route } from 'react-router';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './Context/AuthContext';
import Home from './homePagr/home'
import './App.css'
import Login from './Pages/Login/Login';
// import Signup from './Signup/Signup';
import ForgotPassword from './forgotPassword/forgotPassword';
import Dashboard from './AdminSide/Pages/Dashboard/Dashboard';
import Overview from './AdminSide/Pages/Dashboard/Overview/Overview';
import Products from './AdminSide/Pages/Dashboard/Products/Products';
import Signup from './Signup/Signup';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/login' exact element={<Login />} />
            <Route path='/forgotPassword' exact element={<ForgotPassword />} />
            <Route path='/dashboard' exact element={<Dashboard />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App