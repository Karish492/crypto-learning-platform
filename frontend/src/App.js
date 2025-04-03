import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route, not BrowserRouter as Router
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes> {/* Use Routes directly */}
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
