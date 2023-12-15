import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(true);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <nav className={`navbar  bg-blue-900 dark:bg-blue-800 fixed w-full z-20 top-0 left-0 border-b border-gray-800 dark:border-gray-700${showMenu ? 'open' : ''}`}>
        <div className="navbar-left">
          <Link to='/' className="logo">
            <span >Data Mining lab</span>
          </Link>
        </div>
        <div className="navbar-right">
          <button className="hamburger" onClick={toggleMenu}>
            <div className={`bar ${showMenu ? 'open' : ''}`}></div>
            <div className={`bar ${showMenu ? 'open' : ''}`}></div>
            <div className={`bar ${showMenu ? 'open' : ''}`}></div>
          </button>
          <div className={`menu ${showMenu ? 'show' : ''}`}>
            <Link to='' className="menu-item" onClick={toggleMenu}>Assignment 1</Link>
            <Link to='ass2' className="menu-item" onClick={toggleMenu}>Assignment 2</Link>
            <Link to='classifier' className="menu-item" onClick={toggleMenu}>Assignment 3-4</Link>
            <Link to='otherClassifier' className="menu-item" onClick={toggleMenu}>Assignment 5</Link>
            <Link to='ass6' className="menu-item" onClick={toggleMenu}>Assignment 6</Link>
            <Link to='ass7' className="menu-item" onClick={toggleMenu}>Assignment 7</Link>
            <Link to='ass8' className="menu-item" onClick={toggleMenu}>Assignment 8</Link>
          </div>
        </div>
      </nav>
    </>
  );
};
