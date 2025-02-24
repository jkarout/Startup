// src/login/login.jsx
import React, { useState } from 'react';
import './login.module.css'; 
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook to navigate to other pages

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    // Allow login if both email and password are filled
    if (email && password) {
      setMessage(`Welcome, ${email}!`);
      setTimeout(() => navigate('/survey'), 1000); // Redirect to survey after 1 second
    } else {
      setMessage('Please enter both email and password.');
    }
  };

  return (
    <div>
      <main>
        <p className="styling">
          <strong>Motivational Quote of the Day</strong>
        </p>
        <p>"The only bad workout is the one that didn't happen" - Unknown</p>

        <form onSubmit={handleSubmit}>
          <p>
            In this website, we provide information about any weightlifting
            exercise that you could think of!
          </p>
          <p>If you want help reaching your fitness goals, please login!</p>
          <hr />

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
            />
          </div>

          <button type="submit">Login</button>

          <hr />
          {message && <p style={{ color: 'green' }}>{message}</p>} {/* Display success or error message */}
        </form>
      </main>
    </div>
  );
}
