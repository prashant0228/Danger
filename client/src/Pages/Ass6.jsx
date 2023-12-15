import React from 'react'
// import Ass6Nav from './Ass6Nav'
import { Link } from 'react-router-dom'
import '../Pages/ass8/Ass8.css';

function Ass6() {
  return (
    <>
    <div className='flex flex-col h-auto border border-gray-300 shadow-md bg-white p-10 pl-12 pr-12 w-full mb-3.5 rounded-lg'>
    <div className="page-header text-3xl font-bold leading-12">Assignment 2</div>
    {/* <Ass6Nav/> */}
    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul className="links ">
      <li>
        <Link to='dendrogram' className="navbar-link block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Hierarchical clustering</Link>
      </li>

      <li>
        <Link to='vkmeans' className="navbar-link block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">kmeans</Link>
      </li>
      <li>
        <Link to='kmedoids' className="navbar-link block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">kmedoids</Link>
      </li>
      <li>
        <Link to='birch' className="navbar-link block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:dark:hover:text-green-500 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">BIRCH</Link>
      </li>
      <li>
        <Link to='dbscan' className="navbar-link block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:dark:hover:text-green-500 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">DBSCAN</Link>
      </li>
      <li>
        <Link to='ClusterValidation' className="navbar-link block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:dark:hover:text-green-500 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">ClusterValidation</Link>
      </li>
    </ul>
  </div>
  </div>

    
    </>

  )
}

export default Ass6