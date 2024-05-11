import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './header.css';
import User from './User';

const Header = () => {
  return (
    <header className="header">
      <div className="scontainer flex">
        <div className="logo">
          <img src={logo} alt="logo" width="40px" />
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/about">about</Link>
            </li>
            <li>
              <Link to="/pages">pages</Link>
            </li>
            <li>
              <Link to="/blog">blog</Link>
            </li>
            <li>
              <Link to="/contact">contact</Link>
            </li>
          </ul>
        </nav>
        <div className="account flexCenter">
          <User />
        </div>
      </div>
    </header>
  );
};

export default Header;
