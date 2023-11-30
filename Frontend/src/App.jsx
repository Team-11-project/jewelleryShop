import { useState } from 'react'
import { BrowserRouter as Router, Routes, useLocation } from 'react-router-dom'
import { Route } from 'react-router';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './homePagr/home'
import './App.css'
import Login from './Pages/Login/Login';
import { AuthProvider } from './Context/AuthContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/login' exact element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App