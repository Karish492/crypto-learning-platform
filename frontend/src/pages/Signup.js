import React, { useState } from "react";
import axios from "axios";
const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [UsernameMessage, setUsernameMessage] = useState("")
  const [PasswordMessage, setPasswordMessage] = useState("")
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/accounts/users/', formData)
      window.location.href="/login"
    } catch (err) {
      if (err.response) {
        if (err.response.data.password) {
        console.log(err.response.data.password)
        setPasswordMessage(err.response.data.password)
        }
        else if (err.response.data.username) {
          console.log(err.response.data.username)
          setMessage(err.response.data.username)
        }
        else {
          console.log("something went wrong")
          setMessage("something went wrong")
        }
        // the api sends back error message for either username or password 
      }      
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Username*
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password*
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              required
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          {/* backend does not support  */}
          {/* <div className="mb-4">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.dob}
              onChange={handleChange}
            />
          </div> */}
          
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Sign Up
            </button>
          </div>
        </form>
        {message.length > 0 && (
        <div>
          {message.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      )}

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
