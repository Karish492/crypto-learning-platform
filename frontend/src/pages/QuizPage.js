import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';




const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const { id } = useParams();

  const [data, setData] = useState([])
  const [questions, setQuestions] = useState([])
  const [error, setError] = useState(null)
  const token = localStorage.getItem('access_token');
  const username = localStorage.getItem('username');
  const userId = localStorage.getItem("user_id")

  useEffect(() => {
    if (!token || !username) {
      window.location.href = "/login"
      return;
    }
    axios.get(`http://localhost:8000/api/quiz/${id}/`)
      .then(response => {
        setData(response.data);
        setQuestions(response.data.questions)

      })
      .catch(err => {
        setError(err);
        console.error('Error fetching data:', error);
      });
  }, [error, id, token, username]);

  if (questions.length === 0 || !questions) {
    return <p>Loading</p>
  }


  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption.is_correct === true) {
      setScore(score + 1);
      setMessage("Well Done you got it correct! ")

    }
    else {
      setMessage("Incorrect Answer ! ")
    }

    setSelectedOption("");

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
    setTimeout(() => {
      setMessage("");

    }, 2000);


  };
  const completed = () => {
    updateScore();
    window.location.href = "/"
  }
  const updateScore = async () => {
    try {
      const percentage = Math.round((score / questions.length) * 100)
      console.log(percentage)
      await axios.patch(`http://localhost:8000/api/quiz-tracker/user/${userId}/quiz/${id}/`, {
        completed: true,
        score: percentage,
        user: userId,
        quiz: id,

      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      {showScore ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your Score: {score} / {questions.length}:  </h2>
          <button onClick={completed} className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition`}> Home </button>

        </div>
      ) : (
        <div>
          <h1>Quiz: {data.title} </h1>
          <h3 className="text-xl font-semibold mb-4">Q{questions[currentQuestion].question_number} : {questions[currentQuestion].text}</h3>
          <ul className="space-y-3">
            {questions[currentQuestion].answers.map((option, idx) => (
              <li
                key={idx}
                className={`p-3 border rounded cursor-pointer hover:bg-blue-100 ${selectedOption === option ? "bg-blue-200" : ""
                  }`}
                onClick={() => handleOptionClick(option)}
              >
                {option.text}
              </li>
            ))}
          </ul>
          <button
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleNext}
            disabled={!selectedOption}
          >
            {currentQuestion + 1 < questions.length ? "Next" : "Submit"}
          </button>
          <br></br><b>{message}</b>

          <p>Questions: {currentQuestion + 1}/{questions.length}</p>
        </div>
      )}
    </div>
  );
}
export default QuizPage;