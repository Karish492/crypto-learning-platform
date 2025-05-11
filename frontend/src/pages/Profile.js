import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  let moduleCount = 0
  let quizCount = 0
  const token = localStorage.getItem("access_token")
  const username = localStorage.getItem("username")
  const userId = localStorage.getItem("user_id")
  const email = localStorage.getItem("email")
  const [moduleData, setModuleData] = useState("")
  const [courseCompletion, setCourseCompletion]= useState("")
  const [quizData, setQuizData] = useState("")

  const [user, setUser] = useState({
    username: username,
    email: '',
    completion: 0,
    modulesCompleted: 0,
    quizzesTaken: 0,
  });
 
  useEffect(() => {
    if (!token || !username) {
      window.location.href = "/login"
      return;
    }
    //getting the modules completed
    axios.get(`http://localhost:8000/api/module-tracker/user/${userId}/`).then(modules_completion => {
      setModuleData(modules_completion.data);
    }).catch(err => {
      console.log(err.response)
    });
    //getting the course completion
    axios.get(`http://localhost:8000/api/user-progress/${userId}/`).then(completion_rate => {
      setCourseCompletion(completion_rate.data.lesson_completion);
    }).catch(err => {
      console.log(err.response)
    });
     //getting the quiz taken
     axios.get(`http://localhost:8000/api/quiz-tracker/user/${userId}/`).then(quiz_completion => {
      setQuizData(quiz_completion.data);
    }).catch(err => {
      console.log(err.response)
    });


  }, [token, userId, username]);


  // Iterate over the array with a for loop
  for (let i = 0; i < moduleData.length; i++) {
    if (moduleData[i].completed === true) {
      moduleCount++;
    }
  }

  for (let x = 0; x < quizData.length; x++) {
    if (quizData[x].completed === true) {
      quizCount++;
    }
  }

  useEffect(() =>{
    setUser({
      username: username,
      email: email,
      completion: courseCompletion,
      modulesCompleted: moduleCount,
      quizzesTaken: quizCount,
    });

  }, [moduleCount, courseCompletion, quizCount, email, username]);




  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-8">

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-6">
          <div className="bg-blue-600 text-white w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold">
            {user.username ? user.username.charAt(0) : '?'}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{user.username || 'Loading...'}</h2>
            <p className="text-gray-600">{user.email || 'No Email Found!'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
            <svg className="w-24 h-24">
              <circle
                cx="50%"
                cy="50%"
                r="40"
                stroke="#e5e7eb"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="50%"
                cy="50%"
                r="40"
                stroke="#3b82f6"
                strokeWidth="10"
                fill="none"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 * (1 - user.completion / 100)}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
              <text x="50%" y="54%" textAnchor="middle" className="text-lg font-semibold fill-blue-600">
                {user.completion}%
              </text>
            </svg>
            <p className="mt-3 text-gray-700 font-medium">Course Completion</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-3xl font-bold text-blue-600">{user.modulesCompleted} / {moduleData.length}</p>
            <p className="mt-2 text-gray-700">Modules Completed</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-3xl font-bold text-blue-600">{user.quizzesTaken}</p>
            <p className="mt-2 text-gray-700">Quizzes Taken</p>
          </div>

        </div>

        <div className="bg-green-100 p-6 rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-green-700">Keep Learning!</h3>
            <p className="text-green-800 mt-1">Start another module to continue improving your knowledge.</p>
          </div>
          <Link
            to="/modules"
            className="mt-4 md:mt-0 inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Browse Modules
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Profile;
