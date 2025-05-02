import React from 'react';
import { useNavigate } from 'react-router-dom';
//Component for a button.
const Button = (props) => {
  const navigate = useNavigate();
  const handleTheClick = () => {
    navigate(props.to);
  };

  return (
    <button
      onClick={handleTheClick}
      className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition`}
    >
      {props.text}
    </button>
  );
};

export default Button;