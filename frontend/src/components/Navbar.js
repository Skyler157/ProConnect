import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ setShowLogin, isLoggedIn, user, handleLogout, profileData }) => {
  console.log('Profile Data in Navbar:', profileData); 

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/">
          <h1>ProConnect</h1>
        </Link>
      </div>
      <nav className="nav-container">
        <ul className="nav-menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/propage">Join as a pro</Link>
          </li>
        </ul>
        <div className="nav-right">
          {profileData ? (
            <div className="user-profile">
              <Link to="/profile">
                <i className="fas fa-user-circle profile-icon"></i>
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button onClick={() => setShowLogin(true)}>Sign Up</button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
