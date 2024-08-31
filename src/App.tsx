// AI-GEN START - OpenAI GPT-4
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/signup';
import Login from './components/login';
import Home from './components/home';
import Data from './components/data';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/data" element={<Data />} /> {/* Add the Data route */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
// AI-GEN END
