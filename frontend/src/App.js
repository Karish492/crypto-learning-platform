import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Modules from './pages/Modules';
import Module from './pages/Module';
import Lesson from './pages/Lesson';
import Profile from './pages/Profile';
import LayoutWrapper from './components/LayoutWrapper';

function App() {
  return (
    <Routes>
      {/* Routes with layout (Navbar etc.) */}
      <Route element={<LayoutWrapper />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/modules/:moduleId" element={<Module />} />
        <Route path="/modules/:moduleId/lessons/:lessonId" element={<Lesson />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Catch-all without layout */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
