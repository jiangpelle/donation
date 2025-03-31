import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Web3Provider } from './context/Web3Context';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Donate from './pages/Donate';
import Distribution from './pages/Distribution';
import Records from './pages/Records';
import Apply from './pages/Apply';

function App() {
  return (
    <Web3Provider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/donate/:id" element={<Donate />} />
            <Route path="/distribution" element={<Distribution />} />
            <Route path="/records" element={<Records />} />
            <Route path="/apply" element={<Apply />} />
          </Routes>
        </div>
      </Router>
    </Web3Provider>
  );
}

export default App; 