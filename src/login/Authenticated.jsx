// src/login/Authenticated.jsx
// src/login/Authenticated.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css'; // ✅ Import your existing CSS

export function Authenticated({ userName, onLogout }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('userName'); // Simulate logout by clearing local storage
    onLogout(); // Trigger logout callback
    navigate('/'); // Redirect to home after logout
  };

  return (
    <div className={styles['login-container']}>
      <main>
        <h1 className={styles.styling}>Welcome, {userName}!</h1> {/* ✅ Use existing styling */}
        
        <div className={styles['button-container']}>
          <button onClick={() => navigate('/survey')}>
            Go to Survey
          </button>
          <button onClick={logout}>
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}

