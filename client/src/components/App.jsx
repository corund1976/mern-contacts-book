import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './navbar/Navbar'
import Signup from './signup/Signup';
import Login from './login/Login';
import Logout from './logout/Logout'
import './app.css';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
