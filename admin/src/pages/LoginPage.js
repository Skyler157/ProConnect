// src/pages/LoginPage.js
import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import '../styless/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/admin/login', { email, password });
      localStorage.setItem('adminToken', response.data.token); // Store JWT token
      navigate('/admin/dashboard'); // Redirect to the admin dashboard
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-page">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
