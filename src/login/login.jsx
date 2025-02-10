import React from 'react';
import './login.css'; // ✅ Ensure this import path is correct

export function Login() {
  return (
    <div>

      <main>
        <h1 className='titles'>
        <strong>Motivational Quote of the Day</strong></h1>
        {/* Static quote (same as in HTML) */}
        <p>"The only bad workout is the one that didn't happen" - Unknown</p>

        <form method="get" action="survey.html">
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
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
            />
          </div>

          <button type="submit">Login</button>
          <button type="submit">Create</button>
          <hr />
        </form>
      </main>
    </div>
      
  );
}


