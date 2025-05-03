// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
const token = localStorage.getItem("access_token")
const userId = localStorage.getItem("user_id")
const username = localStorage.getItem("username")
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
        <Link to="/chat" className="text-gray-700 hover:text-green-600">
        Chat
        </Link>
        <Link to="/profile" className="text-gray-700 hover:text-green-600">
          Profile
        </Link>
        {!token || !userId ?
        <Link to="/login" className="text-gray-700 hover:text-green-600">
          Login
          </Link>
        :
        <Link to="/logout" className="text-gray-700 hover:text-green-600">
          Logout: {username}
        </Link>
        } 
       
      </div>
    </nav>
  );
};

export default Navbar;
