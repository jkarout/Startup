
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import {Login} from './login/login';

export default function App() {
  return(
    <BrowserRouter> 
    <div>
      <header>
        <h1>FitInfo, the Ultimate Weightlifting Guide!</h1>
        <hr />
        <nav>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/survey">Survey</NavLink></li>
            <li><NavLink to="/results">Exercise Selection</NavLink></li>
          </ul>
        </nav>
      </header>

      <Routes>

      </Routes>

      <footer>
        
      </footer>

    </div>
    </BrowserRouter>

  )};