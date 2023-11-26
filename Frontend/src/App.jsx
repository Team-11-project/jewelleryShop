import { useState } from 'react'
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
=======
import { BrowserRouter as Router, Routes, useLocation } from 'react-router-dom'
import { Route } from 'react-router';
>>>>>>> main
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './homePagr/home'
import './App.css'
<<<<<<< HEAD
import Signup from './SignUp'
=======
import Login from './Pages/Login/Login';
import { AuthProvider } from './Context/AuthContext'
>>>>>>> main

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<<<<<<< HEAD
      <div>
        <Signup/>
      </div>
=======
      <Router>
        <Routes>
          <Route path='/' exact element={<Home />} />
        </Routes>
        <AuthProvider>
          <Routes>
            <Route path='/login' exact element={<Login />} />
          </Routes>
        </AuthProvider>

      </Router>

>>>>>>> main
    </>
  )
}

export default App
