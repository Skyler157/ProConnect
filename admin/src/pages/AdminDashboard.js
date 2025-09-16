// src/pages/AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styless/AdminDashboard.css';

function AdminDashboard() {
  return (
    <div>
      <h1>Welcome to the Admin Dashboard</h1>

      {/* Button to go back to the HomePage */}
      <div>
        <Link to="/">
          <button>Back to HomePage</button>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
