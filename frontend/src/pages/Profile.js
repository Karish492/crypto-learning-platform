import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    completion: 0,
    modulesCompleted: 0,
    quizzesTaken: 0,
  });

  useEffect(() => {
    const dummyData = {
      name: 'Joseph Smith',
      email: 'josephsmith@example.com',
      completion: 60,
      modulesCompleted: 4,
      quizzesTaken: 3,
    };
    setUser(dummyData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-8">

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-6">
          <div className="bg-blue-600 text-white w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold">
            {user.name ? user.name.charAt(0) : '?'}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{user.name || 'Loading...'}</h2>
            <p className="text-gray-600">{user.email || 'Loading email...'}</p>
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
            <p className="text-3xl font-bold text-blue-600">{user.modulesCompleted}</p>
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
