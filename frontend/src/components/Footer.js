import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <p className="logo">ProConnect.</p>
          <p>Your one-stop platform to find service providers for any task.</p>
          <div className="footer-social-icons">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-instagram"></i>
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-tiktok"></i>
            </a>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-whatsapp"></i>
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about-us">About Us</Link></li> {/* Link to About Us page */}
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+254796886037</li>
            <li>ProConnect@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2025 &copy; ProConnect.com - All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;