// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styless/Homepage.css';

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Welcome to the application. Here are some options:</p>

      {/* Link to the LoginPage */}
      <div>
        <Link to="/admin/login">
          <button>Go to Login Page</button>
        </Link>
      </div>

      {/* Link to the Admin Dashboard */}
      <div>
        <Link to="/admin/dashboard">
          <button>Go to Admin Dashboard</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
