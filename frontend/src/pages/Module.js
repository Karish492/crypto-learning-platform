import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Error from '../components/Error';
import Button from '../components/Button';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios' // this is so frontend can send data to backend
//mock data for module page to see how it looks etc.
/*const modules = [
  { id: 1, name: "Intro to Blockchain", description: "Learn about blockchain basics." },
  { id: 2, name: "Smart Contracts", description: "Understanding smart contracts." },
  { id: 3, name: "DeFi", description: "Explore Decentralized Finance." },
]; */

const Module = () => {


  const { id } = useParams();
  const [data1, setData1] = useState([])
  const [CurrentLesson, setCurrentLesson] = useState(0)
  const [error1, setError1] = useState(null)
  const token = localStorage.getItem('access_token');
  const username = localStorage.getItem('get_username');
  const userId = localStorage.getItem('user_id')



  useEffect(() => {
    if (!token || !username) {
      localStorage.setItem("login_message", true)

      window.location.href = "/login"
      return;
    }
    axios.get(`http://localhost:8000/api/module/${id}/lessons/`).then(response => {
      setData1(response.data);
    }).catch(err => {
      setError1(err);
      console.error('Error fetching data:', error1);
    });
  }, [error1, id]);
  // Pass data from Modules to Module using props instead of mock data this is just for testing and front end.
  const { isLoading, error, data } = useQuery({
    queryKey: ['modules'],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8000/api/module/${id}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },

  });


  if (isLoading) {
    return <h1> Loading...</h1>
  }

  if (error) {
    return 'An Error Has Occured: ' + error.message

  };

  if (isLoading) {
    return <h1> Loading...</h1>
  }

  if (error) {
    return 'An Error Has Occured: ' + error.message
  }

  if (data1.length === 0) {
    return "An Error Has Occurred:"
  }
  const clicked = async () => {
    handleNext();
    updateScore();
  }
  const handleNext = async () => {
    // Move to the next lesson but not for last lesson
    if (CurrentLesson < data1.length - 1) {
      setCurrentLesson((lesson) => lesson + 1);
    }
    //this is where it will update progress
  };

  const updateScore = async () => {
    const lesson_id1 = data1[CurrentLesson].lesson_id
    console.log(lesson_id1)
    try {
      await axios.patch(`http://localhost:8000/api/lesson-tracker/user/${userId}/lesson/${lesson_id1}/`, {
        completed: true,
        user: userId,
        lesson: lesson_id1,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      },
      );
    } catch (error) {
      console.log(error.message)
    }

  }
  const completed = async () => {
    updateScore()
    window.location.href = `/quiz/${data.module_id}`
  }
  return (
    <div className="flex flex-row min-h-screen p-6 gap-6">
      <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
        <p className="text-lg mb-6">{data.description}</p>
        {/* The code below is the code to render lessons*/}
        {/*data1.map(lesson => ( <p><b>{lesson.title}</b>: {lesson.text}<br></br></p> ))*/}

        <b>{data1[CurrentLesson].title}</b>: {data1[CurrentLesson].text}

        <br></br><br></br>
        {CurrentLesson < data1.length - 1 ? (
          <button onClick={clicked} className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition`}>Next </button>
        ) : (
          <button onClick={completed} className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition`}>Start Quiz </button>
        )}
      </div>

      <div className="flex-1 bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4">
        <iframe
          src={"https://www.youtube.com/embed/lJrrT83ydeA"}
          title="Module Video"
          className="w-full h-64 md:h-80 rounded-md"
          allowFullScreen
        />
        <img
          src="/bitcoin_cover.jpg"
          alt={data.title}
          className="w-full h-64 object-cover rounded-md shadow"
        />
      </div>
    </div>
  );
};

export default Module;
