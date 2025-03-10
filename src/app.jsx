// src/App.jsx
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';

// Import Existing Components
import { Login } from './login/login';
import { Results } from './results/results';
import { Survey } from './survey/survey';
import { Squat } from './squats/squats';
import { Bench } from './bench/bench';
import { Deadlift } from './deadlift/deadlift';

// Import New Authentication Components
// src/App.jsx
import { Authenticated } from './login/Authenticated';
import { Unauthenticated } from './login/Unauthenticated';
import { AuthState} from './login/authState';



export default function App() {
  // State to manage user authentication
  const [userName, setUserName] = useState('');

  // Check localStorage to see if the user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/status', {
          method: 'GET',
        });
  
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
  ;
  

  // Login handler
  const handleLogin = (name) => {
    setUserName(name);
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'DELETE',
        credentials: 'include', // ✅ Ensure cookies are included
      });
  
      setUserName('');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await fetch('/api/test', {
          method: 'GET',
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch surveys');
        }
    
        const data = await response.json();
        console.log("Fetched survey data:", data); // Debugging
        setUsers(data);
      } catch (error) {
        console.error('Error fetching surveys:', error);
        setErrorMessage('Could not load survey data.');
      }
    };
    

    fetchSurveys();
  }, []);
  

  return (
    <Router> 
      <div className="body"> 
        <header>
          <h1>FitInfo, the Ultimate Weightlifting Guide!</h1>
          <hr />
          <nav>
            <ul> 
              <li><NavLink to="/" end>Home</NavLink></li>
              <li><NavLink to="/survey">Survey</NavLink></li>
              <li><NavLink to="/results">Exercise Selection</NavLink></li>
            </ul>
          </nav>
        </header>

        <Routes>
          {/* Home Route: Show Authenticated or Unauthenticated Component */}
          <Route 
            path="/" 
            element={userName ? <Authenticated userName={userName} onLogout={handleLogout} /> : <Unauthenticated onLogin={handleLogin} />} 
          />

          {/* Other Routes */}
          <Route path="/survey" element={<Survey />} />
          <Route path="/results" element={<Results />} />
          <Route path="/squat" element={<Squat />} />
          <Route path="/bench" element={<Bench />} />
          <Route path="/deadlift" element={<Deadlift />} />
        </Routes> 

        <footer>
          <p><strong> By: Jarir Karout</strong></p>
          <a href="https://github.com/jkarout/Startup" target="_blank" rel="noopener noreferrer">Github</a>
        </footer>
      </div>
    </Router>
  );
}

