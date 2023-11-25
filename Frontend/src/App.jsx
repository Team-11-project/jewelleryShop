import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './SignUp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Signup/>
      </div>
    </>
  )
}

export default App
