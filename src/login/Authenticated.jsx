// src/login/Authenticated.jsx
// src/login/Authenticated.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css'; // ✅ Import your existing CSS

export function Authenticated({ userName, onLogout }) {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'DELETE',
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error("Logout failed");
      }
  
      onLogout(); // Clear authentication state only if logout succeeds
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error("Logout failed:", error);
    }
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

