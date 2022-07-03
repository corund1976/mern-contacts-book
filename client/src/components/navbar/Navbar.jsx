import React from 'react';
import { Link } from "react-router-dom";

import './navbar.css'
import Logo from '../../assets/img/book-open.svg'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <img src={Logo} alt="logo" className="navbar__logo" />
        <div className="navbar__header">Contacts Book</div>
        <div className="navbar__login"><Link to='/login'>Войти</Link></div>
        <div className="navbar__signup"><Link to='/signup'>Регистрация</Link></div>

      </div>
    </div>
  )
}

export default Navbar