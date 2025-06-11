import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NearProvider } from './context/NearContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import SponsorPage from './pages/SponsorPage';
import './index.css';

function App() {
  return (
    <NearProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sponsor" element={<SponsorPage />} />
          </Routes>
        </div>
      </Router>
    </NearProvider>
  );
}

export default App;