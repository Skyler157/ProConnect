// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('adminToken');

  // If the token is not found, redirect to login page
  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  // If the token is valid, render the children (the protected route)
  return children;
}

export default PrivateRoute;
