import React from 'react';
import { useParams } from 'react-router-dom';

const Module = () => {
  const { moduleId } = useParams();

  return <h1>Module Details for: {moduleId}</h1>;
};

export default Module;
