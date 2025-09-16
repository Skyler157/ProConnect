// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/Homepage';
import PrivateRoute from './components/PrivateRoute'; // Private route to protect dashboard

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the HomePage */}
        <Route path="/" element={<HomePage />} />

        {/* Route for the Login Page */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Protected Route for Admin Dashboard */}
        <Route 
          path="/admin/dashboard" 
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
