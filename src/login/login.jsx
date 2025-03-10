import React, { useState, useEffect } from 'react';
import './login.module.css'; 
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [quote, setQuote] = useState(''); // Store fetched quote
  const [author, setAuthor] = useState(''); // Store quote author
  const navigate = useNavigate(); // Hook to navigate to other pages

  // Fetch a motivational quote from a third-party API
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://zenquotes.io/api/random');
        const data = await response.json();
        console.log("Fetched Quote:", data); // Debugging
        setQuote(data[0].q);
        setAuthor(data[0].a);
      } catch (error) {
        console.error('Error fetching quote:', error);
        setQuote('The only bad workout is the one that didn’t happen.');
        setAuthor('Unknown');
      }
    };
  
    fetchQuote();
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include', // ✅ Ensures cookies are sent
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Login failed');
      }
  
      const data = await response.json();
      console.log('✅ Logged in:', data);
  
      // ✅ Check if cookie was set in the response headers
      console.log('🔍 Cookies:', document.cookie);
  
      setTimeout(() => navigate('/survey'), 1000);
    } catch (error) {
      console.error('❌ Login failed:', error);
    }
  };
  
  
  

  return (
    <div>
      <main>
        <p className="styling">
          <strong>Motivational Quote of the Day</strong>
        </p>
        <p>"{quote}" - {author}</p>

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
