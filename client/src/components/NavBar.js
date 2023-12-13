import React from 'react';
import { Link } from 'react-router-dom';
import isteImage from '../images/ISTE.png'; // Assuming the path to your image is correct


const handleLogout = () => {
  // Remove token from local storage
  localStorage.removeItem('token');
  // Redirect to login page
  window.location.href = '/login';
};

const NavBar = () => {
  return (
    <div className="bg-slate-700 text-white py-4 px-8 flex justify-between items-center">
      <div className="flex items-center">
        <img src={isteImage} alt="ISTE Logo" className="w-12 h-12" />
        <h1 className="ml-5 text-3xl font-bold mr-4">Admin Portal</h1>
      </div>
      <div>
        <Link
          to="/add"
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-4"
        >
          Add Project
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
