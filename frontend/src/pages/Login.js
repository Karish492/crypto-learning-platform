// src/pages/Login.js
import React, { use, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Login = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('')


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const signin = await axios.post('http://localhost:8000/api/accounts/jwt/create', formData);
      
      localStorage.setItem('access_token', signin.data.access)
      localStorage.setItem('refresh_token', signin.data.refresh)
      axios.defaults.headers.common['Authorization'] = `Bearer ${signin.data.access}`
      const getUser = await axios.get('http://localhost:8000/api/accounts/users/me/')

      localStorage.setItem('user_id',getUser.data.id);
      localStorage.setItem('username',getUser.data.username)
      

      window.location.href = "/"
      

  } catch (err) {
    if (err.status === 400){
      setMessage("All Fields Must Be Entered")
      console.log(err.response);
    }
    if (err.status === 401){
      setMessage("Invalid Credentials / Account Doesn't Exist")
    }
    else {
      setMessage( err.message)
    }
  }
  };
  
    const login_message = localStorage.getItem("login_message")
    useEffect(() => {
  
    }, [login_message]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <br></br>
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="username"
              id="username"
              name="username"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Log In
            </button>
            
          </div>
        </form>
        <p className="text-center">{message}</p>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
