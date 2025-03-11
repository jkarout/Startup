import React, { useState, useEffect } from 'react';
import './login.module.css'; 
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();

  // Fetch a motivational quote from a third-party API
  useEffect(() => {
    const fetchQuote = async () => { 
      try {
        let response = await fetch('https://zenquotes.io/api/random');
        let data = await response.json();
        
        console.log("Fetched Quote Data:", data);
        
        if (Array.isArray(data) && data.length > 0 && data[0].q) {
          setQuote(data[0].q);
          setAuthor(data[0].a);
        } else {
          throw new Error('Invalid API response structure');
        }
      } catch (error) {
        console.error('Error fetching quote:', error);
        
        // Fallback to alternative API if the first one fails
        try {
          let response = await fetch('https://api.quotable.io/random');
          let data = await response.json();
          setQuote(data.content);
          setAuthor(data.author);
        } catch (fallbackError) {
          console.error('Error fetching fallback quote:', fallbackError);
          setQuote('The only bad workout is the one that didn’t happen.');
          setAuthor('Unknown');
        }
      }
    };
    
    fetchQuote();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Login failed');
      }
  
      const data = await response.json();
      console.log('✅ Logged in:', data);
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Login</button>

          <hr />
          {message && <p style={{ color: 'green' }}>{message}</p>}
        </form>
      </main>
    </div>
  );
}


