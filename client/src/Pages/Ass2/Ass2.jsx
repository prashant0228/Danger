import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../ass8/Ass8.css';

function Ass2() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
    <div className='flex flex-col h-auto border border-gray-300 shadow-md bg-white p-10 pl-12 pr-12 w-full mb-3.5 rounded-lg'>
      <div className="page-header text-3xl font-bold leading-12">Assignment 2</div>

      <div className="navbar-container">
        <ul className="navbar-list w-80">
          <li>
            <Link to="chi" className="navbar-link">chi</Link>
          </li>

          <li>
            <Link to="pearson" className="navbar-link">pearson</Link>
          </li>

          <li>
            <Link to="normalization" className="navbar-link">normalization</Link>
          </li>
        </ul>
      </div>
      </div>
    </>
  );
}

export default Ass2;
