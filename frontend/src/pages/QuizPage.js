import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const allQuizzes = {
    1: [
      {
        question: "What is blockchain?",
        options: ["A database", "A type of cloud", "A currency", "A game"],
        answer: "A database"
      }
    ],
    2: [
      {
        question: "What is Bitcoin?",
        options: ["Programming language", "Cryptocurrency", "Bank", "Company"],
        answer: "Cryptocurrency"
      }
    ]
  };

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] =useState(null);
  const [showScore, setShowScore] = useState(false);
  const { id } = useParams();
  const quizData = allQuizzes[id] || [];


  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === quizData[currentQuestion].answer) {
      setScore(score + 1);
      setMessage("Well Done you got it correct! ")

    }
    else{
      setMessage("Incorrect Answer ! ")
    }

    setSelectedOption("");

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      {showScore ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your Score: {score} / {quizData.length}</h2>
          <p className="text-lg">{message}</p>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-4">{quizData[currentQuestion].question}</h3>
          <ul className="space-y-3">
            {quizData[currentQuestion].options.map((option, idx) => (
              <li
                key={idx}
                className={`p-3 border rounded cursor-pointer hover:bg-blue-100 ${
                  selectedOption === option ? "bg-blue-200" : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
          <button
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleNext}
            disabled={!selectedOption}
          >
            {currentQuestion + 1 < quizData.length ? "Next" : "Submit"}
          </button>
        </div>
      )}
    </div>
  );
}
export default QuizPage;