import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProPage.css';
import ProPageInfo from './ProPageInfo';

const ProPage = ({ setProfileData, setUser, setIsLoggedIn, user }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(false); // Track if user is logging in
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    password: '',
    phone: '',
    service: '',
    experience: '',
    location: '',
    bio: '',
    profileImage: null,
  });

  // Handle input changes for profile form and login form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file upload for profile image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB.');
        return;
      }
      setFormData({
        ...formData,
        profileImage: file,
      });
      setError('');
    }
  };

  // Handle profile form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.phone ||
      !formData.service ||
      !formData.experience ||
      !formData.location ||
      !formData.bio
    ) {
      setError('All fields are required.');
      return;
    }

    setIsLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('phone', formData.phone);
    data.append('service', formData.service);
    data.append('experience', formData.experience);
    data.append('location', formData.location);
    data.append('bio', formData.bio);
    if (formData.profileImage) {
      data.append('profileImage', formData.profileImage);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/pro', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Profile updated successfully!');
      localStorage.setItem('proProfile', JSON.stringify(response.data.professional)); // Store updated profile in localStorage
      setProfileData(response.data.professional); // Update profileData in App.js
      navigate('/dashboard'); // Navigate to dashboard after profile update
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('There was an error while submitting your form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle changes in login form fields
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/pro/login', loginData);
      console.log('Login successful:', response.data);
  
      // Handle successful login
      const token = response.data.token;
      const professional = response.data.professional;
  
      // Save token and professional data to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('proProfile', JSON.stringify(professional));
  
      // Update user state in the parent component
      setUser(professional);
      setProfileData(professional); // Update profileData in App.js
  
      setIsLoggedIn(true); // Set logged-in state
      navigate('/dashboard'); // Navigate to dashboard after login
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      alert('Login failed. Please check your credentials or try again later.');
    }
  };

  
  return (
    <div className="pro-page">
      <div className="welcome-section">
        <h1>Welcome back, {user ? user.name : 'Professional'}!</h1>
        <h2>{isLogin ? 'Login to your account' : 'Complete your profile to get started'}</h2>
      </div>

      {isLogin ? (
        <form onSubmit={handleLogin} className="profile-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <p>
            Don't have an account?{' '}
            <span onClick={() => setIsLogin(false)} className="toggle-link">
              Sign up here
            </span>
          </p>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="service">Service Offered:</label>
            <input
              type="text"
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="experience">Experience:</label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="profileImage">Upload Profile Image:</label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              onChange={handleImageUpload}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Profile'}
          </button>
          <p>
            Already have an account?{' '}
            <span onClick={() => setIsLogin(true)} className="toggle-link">
              Login here
            </span>
          </p>
        </form>
      )}
      <hr className='hr' />
      <ProPageInfo />
    </div>
  );
};

export default ProPage;
