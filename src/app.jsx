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
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/status', { method: 'GET', credentials: 'include' });

        if (!response.ok) {
          throw new Error('Not authenticated');
        }

        const data = await response.json();
        setUserName(data.email);
      } catch (error) {
        console.error("❌ User not authenticated:", error);
        setUserName('');
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'DELETE', credentials: 'include' });
      setUserName('');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

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

      {/* ✅ Global GitHub Footer */}
      <footer style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9em', color: '#555' }}>
        <hr />
        <p>
          <a href="https://github.com/jkarout/Startup" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </footer>
    </Router>
  );
}

