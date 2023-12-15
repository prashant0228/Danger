import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './Ass8.css';

function Ass8() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
    <div className='flex flex-col h-auto border border-gray-300 shadow-md bg-white p-10 pl-12 pr-12 w-full mb-3.5 rounded-lg'>
      <div className="page-header text-3xl font-bold leading-12">Assignment 8</div>

      <div className="navbar-container">
        <ul className="navbar-list">
          <li>
            <Link to="crawl" className="navbar-link">Crawl</Link>
          </li>

          <li>
            <Link to="hitscore" className="navbar-link">Hitscore</Link>
          </li>

          <li>
            <Link to="pagerank" className="navbar-link">Paperrank</Link>
          </li>
        </ul>
      </div>
      </div>
    </>
  );
}

export default Ass8;
