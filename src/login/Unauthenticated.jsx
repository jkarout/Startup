
import React, { useState } from 'react';
import styles from './login.module.css';

export function Unauthenticated({ onLogin }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loginUser = () => {
    if (!userName || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    localStorage.setItem('userName', userName); // Simulate login
    onLogin(userName);
    setErrorMessage('');
  };

  const createUser = () => {
    if (!userName || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    localStorage.setItem('userName', userName);
    onLogin(userName);
    setErrorMessage('');
  };

  return (
    <div className="login-container">
      <main>
        <p className="styling">
          <strong>Motivational Quote of the Day</strong>
        </p>
        <p>"The only bad workout is the one that didn't happen" - Unknown</p>

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

          {/* Display error message in red */}
          {errorMessage && <p className={styles['login-error-message']}>{errorMessage}</p>
        }
        </form>
      </main>
    </div>
  );
}
