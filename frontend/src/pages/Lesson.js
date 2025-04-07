import React from 'react';
import { useParams } from 'react-router-dom';

const Lesson = () => {
  const { moduleId, lessonId } = useParams();

  return (
    <div>
      <h1>Lesson: {lessonId}</h1>
      <p>Under Module: {moduleId}</p>
    </div>
  );
};

export default Lesson;
