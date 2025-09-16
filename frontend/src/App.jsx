import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PaymentPage from './components/PaymentPage';
import ProPage from './components/ProPage';
import JobDetails from './components/JobDetails';
import ProsForJob from './components/ProsForJob';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import './styles/App.css';
import LoginPopup from './components/LoginPopup/LoginPopup';
import UserProfile from './components/UserProfile';
import Dashboard from './components/Dashboard';
import AccountSettings from './components/AccountSettings';
import ProPageInfo from './components/ProPageInfo';
import Joinaspro from './components/Joinaspro';
import Service from './components/Service';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);

  // Check if the user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  // Fetch user profile using the token
  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setIsLoggedIn(true);
      setProfileData(response.data); // Set profileData when logged in
      localStorage.setItem('proProfile', JSON.stringify(response.data)); // Store profile data in localStorage
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
    setProfileData(null);
  };

  return (
    <Router>
      {showLogin && (
        <LoginPopup
          setShowLogin={setShowLogin}
          setIsLoggedIn={setIsLoggedIn}
          setUser={setUser}
          setProfileData={setProfileData}
        />
      )}
      <Navbar
        setShowLogin={setShowLogin}
        isLoggedIn={isLoggedIn}
        user={user}
        handleLogout={handleLogout}
        profileData={profileData} // Pass profileData to Navbar
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Service />} />
        <Route path="/propage" element={<ProPage setProfileData={setProfileData} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/pros-for-job/:id" element={<ProsForJob />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/profile" element={<UserProfile setProfileData={setProfileData} />} />
        <Route path="/dashboard" element={<Dashboard profileData={profileData} setProfileData={setProfileData} />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/propageinfo" element={<ProPageInfo />} />
        <Route path="/joinaspro" element={<Joinaspro />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
