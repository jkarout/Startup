
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';



import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import {Login} from './login/login';
import {Results} from './results/results';
import {Survey} from './survey/survey';
import {Squat} from './squats/squats';

export default function App() {
  return(
    <BrowserRouter> 
    <div
    className = "body"> 
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
        <Route path='/' element={<Login />} exact />
        <Route path='/survey' element={<Survey />} />
        <Route path='/results' element={<Results />} />
        <Route path='/squats' element={<Squat />} />

      </Routes> 


  
      <footer>
      <p><strong> By: Jarir Karout</strong></p>
      <a href="https://github.com/jkarout/Startup">Github</a>
      </footer>

    </div>
    </BrowserRouter>

  )};