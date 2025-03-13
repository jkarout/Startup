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

  // Local fallback quotes
  const fallbackQuotes = [
    { content: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', author: 'Winston Churchill' },
    { content: 'Do what you can, with what you have, where you are.', author: 'Theodore Roosevelt' },
    { content: 'It always seems impossible until it’s done.', author: 'Nelson Mandela' },
    { content: 'Believe you can and you’re halfway there.', author: 'Theodore Roosevelt' }
  ];

  // Fetch a motivational quote from a third-party API
  useEffect(() => {
    const fetchQuote = async () => { 
      try {
        let response = await fetch('https://api.quotable.io/quotes?tags=motivational');
        let data = await response.json();
        
        if (data.results && data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length);
          setQuote(data.results[randomIndex].content);
          setAuthor(data.results[randomIndex].author);
        } else {
          throw new Error('Invalid API response structure');
        }
      } catch (error) {
        console.error('Error fetching quote:', error);
        
        // Select a random quote from the local fallback list
        const randomFallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        setQuote(randomFallback.content);
        setAuthor(randomFallback.author);
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
        <p style={{ fontStyle: 'italic', fontSize: '1.2em' }}>
          "{quote}" - {author}
        </p>

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