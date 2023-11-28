import { useState } from 'react'
import { BrowserRouter as Router, Routes, useLocation } from 'react-router-dom'
import { Route } from 'react-router';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './homePagr/home'
import './App.css'
import Login from './Pages/Login/Login';
import { AuthProvider } from './Context/AuthContext'
import ForgotPassword from './forgotPassword/forgotPassword';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' exact element={<Home />} />
          {/* <Route path='/forgotPassword' exact element={<ForgotPassword/>} /> */}

        </Routes>
        <AuthProvider>
          <Routes>
            <Route path='/login' exact element={<Login />} />
            <Route path='/forgotPassword' exact element={<ForgotPassword/>} />
          </Routes>
        </AuthProvider>

      </Router>

    </>
  )
}

export default App
