// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        CryptoSense
      </Link>

      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-green-600">
          Home
        </Link>
        <Link to="/modules" className="text-gray-700 hover:text-green-600">
          Modules
        </Link>
        <Link to="/quiz" className="text-gray-700 hover:text-green-600">
          Quizzes
        </Link>
        <Link to="/profile" className="text-gray-700 hover:text-green-600">
          Profile
        </Link>
        <Link to="/login" className="text-gray-700 hover:text-green-600">
          Login
        </Link> 
      </div>
    </nav>
  );
};

export default Navbar;
