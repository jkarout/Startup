// src/App.jsx
// src/App.jsx
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter as Router, NavLink, Route, Routes, Navigate } from 'react-router-dom';

// Import Components
import { Login } from './login/login';
import { Results } from './results/results';
import { Survey } from './survey/survey';
import { Squat } from './squats/squats';
import { Bench } from './bench/bench';
import { Deadlift } from './deadlift/deadlift';
import { Authenticated } from './login/Authenticated';
import { Unauthenticated } from './login/Unauthenticated';

export default function App() {
  // State to track authentication
  const [userName, setUserName] = useState('');

  // Check if the user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/status', { method: 'GET', credentials: 'include' });

        if (!response.ok) {
          throw new Error('Not authenticated');
        }

        const data = await response.json();
        setUserName(data.email); // ✅ Set userName from backend response
      } catch (error) {
        console.error("❌ User not authenticated:", error);
        setUserName(''); // Clear user state
      }
    };

    checkAuth();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'DELETE', credentials: 'include' });
      setUserName(''); // Clear user state
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // 🔹 Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    return userName ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <nav>
        <NavLink to="/survey">Survey</NavLink>
        <NavLink to="/results">Results</NavLink>
        <NavLink to="/squat">Squat</NavLink>
        <NavLink to="/bench">Bench</NavLink>
        <NavLink to="/deadlift">Deadlift</NavLink>
        {userName ? <button onClick={handleLogout}>Logout</button> : <NavLink to="/login">Login</NavLink>}
      </nav>

      <Routes>
        <Route path="/login" element={userName ? <Navigate to="/survey" /> : <Unauthenticated onLogin={setUserName} />} />
        <Route path="/survey" element={<ProtectedRoute><Survey /></ProtectedRoute>} />
        <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
        <Route path="/squat" element={<ProtectedRoute><Squat /></ProtectedRoute>} />
        <Route path="/bench" element={<ProtectedRoute><Bench /></ProtectedRoute>} />
        <Route path="/deadlift" element={<ProtectedRoute><Deadlift /></ProtectedRoute>} />
        <Route path="/" element={userName ? <Authenticated userName={userName} onLogout={handleLogout} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
