import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./index.css";

function Login() {
  return (
    <main>
      <h1>Welcome to FitInfo</h1>
      <form>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
        <button type="submit">Create</button>
      </form>
    </main>
  );
}

function App() {
  return (
    <Router>
      <header>
        <h1>FitInfo</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/survey">Survey</Link>
          <Link to="/results">Exercise Selection</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/survey" element={<div>Survey Page</div>} />
        <Route path="/results" element={<div>Exercise Selection Page</div>} />
      </Routes>
      <footer>
        <p>By: Jarir Karout</p>
        <a href="https://github.com/jkarout/Startup">Github</a>
      </footer>
    </Router>
  );
}

export default App;




