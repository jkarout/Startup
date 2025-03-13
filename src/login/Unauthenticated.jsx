
import React, { useState, useEffect } from 'react';
import styles from './login.module.css';

export function Unauthenticated({ onLogin }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  // Local fallback quotes

  // Fetch a motivational quote
  React.useEffect(() => {
    fetch('https://gomezmig03.github.io/MotivationalAPI/en.json', {
        method: 'GET',
    })
        .then((res) => res.json())
        .then((data) => {
            console.log('Data:', data);
            // Get a random index
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomElement = data[randomIndex];
            setQuote(randomElement.phrase)
            //setQuote(data.quote)
        })
        .catch((error) => {
            console.error('Error:', error);
            setQuote("Could not fetch quote")
        });
  }, []);

  // Fixing the login function
  const loginUser = async () => {
    if (!userName || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userName, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Login failed');
      }

      const data = await response.json();
      onLogin(data.email); // Update authentication state
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message || 'Login failed.');
    }
  };

  // Fixing the create user function
  const createUser = async () => {
    if (!userName || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(userName)) {  // ✅ Simple email validation
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('/api/auth/create', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userName, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Account creation failed');
      }

      const data = await response.json();
      onLogin(data.email); // Update authentication state
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message || 'Account creation failed.');
    }
  };

  return (
    <div className="login-container">
      <main>
        <p className="styling">
          <strong>Motivational Quote of the Day</strong>
        </p>
        <p style={{ fontStyle: 'italic', fontSize: '1.2em' }}>"{quote}" - {author}</p>

        <form>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="your@email.com"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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

          <div className="button-container">
            <button type="button" onClick={loginUser}>
              Login
            </button>
            <button type="button" onClick={createUser}>
              Create Account
            </button>
          </div>

          {errorMessage && <p className={styles['login-error-message']}>{errorMessage}</p>}
        </form>
      </main>
    </div>
  );
}