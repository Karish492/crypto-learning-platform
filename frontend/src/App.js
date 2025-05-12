import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Modules from './pages/Modules';
import Module from './pages/Module';
import Profile from './pages/Profile';
import QuizPage from './pages/QuizPage';
import LayoutWrapper from './components/LayoutWrapper';
import Login from './pages/Login';  
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import Logout from './pages/Logout';

function App() {
  return (
    <Routes>
      <Route element={<LayoutWrapper />}>
        <Route path="/" element={<Home />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/modules/:id" element={<Module />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/chat" element={<Chat />} />
      </Route>
      
      <Route path="/login" element={<Login />} />
      <Route path="logout" element={<Logout />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
