import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/common/Header';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import StudyGroups from './pages/StudyGroups';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes - No Header */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes - With Header */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Header />
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/courses" element={<Courses />} />
                      <Route path="/groups" element={<StudyGroups />} />
                      <Route path="/profile" element={<Profile />} />
                      {/* Redirect any unknown routes to dashboard */}
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;