import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './homePagr/home';
import ForgotPassword from './forgotPassword/forgotPassword';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        {/* Navigation Links (optional, you can remove or modify this) */}
        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/forgot-password">Forgot Password</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;