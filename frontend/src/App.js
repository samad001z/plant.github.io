import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/ModernHomePage';
import DashboardPage from './pages/DashboardPage';
import ScanPage from './pages/ScanPage';
import ResultsPage from './pages/ResultsPage';
import HistoryPage from './pages/HistoryPage';
import { ChatBot } from './components/AIAssistant';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);
  const [scanResult, setScanResult] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setScanResult(null);
  };

  const handleScanComplete = (result) => {
    setScanResult(result);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/signup"
            element={<SignUpPage onLogin={handleLogin} />}
          />
          <Route
            path="/signin"
            element={<SignInPage onLogin={handleLogin} />}
          />
          <Route
            path="/home"
            element={
              user ? (
                <HomePage user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              user ? (
                <DashboardPage user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/scan"
            element={
              user ? (
                <ScanPage user={user} onLogout={handleLogout} onScanComplete={handleScanComplete} />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/result"
            element={
              user ? (
                <ResultsPage user={user} onLogout={handleLogout} result={scanResult} />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/history"
            element={
              user ? (
                <HistoryPage user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/assistant"
            element={
              user ? (
                <HomePage user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
        </Routes>

        {user && <ChatBot />}
      </div>
    </Router>
  );
}

export default App;
