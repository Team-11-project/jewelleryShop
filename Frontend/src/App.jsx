import { useState } from 'react'
import { BrowserRouter as Router, Routes, useLocation } from 'react-router-dom'
import { Route } from 'react-router';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './homePagr/home'
import './App.css'
import Login from './Pages/Login/Login';
// import Signup from './Signup/Signup';
import { AuthProvider } from './Context/AuthContext'
import Signup from './Signup/Signup';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' exact element={<Home />} />
        </Routes>
        <AuthProvider>
          <Routes>
            <Route path='/login' exact element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </AuthProvider>

      </Router>

    </>
  )
}

export default App
