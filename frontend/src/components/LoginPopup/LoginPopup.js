import React, { useState } from 'react';
import axios from 'axios';
import './LoginPopup.css';
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin, setIsLoggedIn, setUser }) => {
  const [currState, setCurrState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { name, email, password };

    try {
      let response;
      if (currState === 'Sign Up') {
        // Register a new user
        response = await axios.post('http://localhost:5000/api/auth/register', userData);
        alert('Registration successful!');
      } else {
        // Login an existing user
        response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        
        alert('Login successful!');
      }

      // Save the token to localStorage
      localStorage.setItem('token', response.data.token);

      // Update login state and user data in the parent component
      setIsLoggedIn(true);
      setUser(response.data.user);

      // Close the login popup
      setShowLogin(false);
    } catch (error) {
      console.error('Error:', error.response?.data?.message || 'Something went wrong');
      alert(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === 'Sign Up' && (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{currState === 'Sign Up' ? 'Create account' : 'Login'}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === 'Login' ? (
          <p>
            Create a new account?{' '}
            <span onClick={() => setCurrState('Sign Up')}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <span onClick={() => setCurrState('Login')}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;