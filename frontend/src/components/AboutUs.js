import React from 'react';
import '../styles/AboutUs.css'; // Import the CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-us">
      <h1>About ProConnect</h1>
     <p>Welcome to ProConnect, your one-stop platform to find top-notch service providers for any task you need, no matter where you are.</p> 
      <p>
        ProConnect is a revolutionary platform designed to bridge the gap between service providers and clients across the country. 
        Our mission is to make it easy for people to find and hire skilled professionals for any task, from drivers and chefs to 
        mechanics and doctors, all from the comfort of their homes.
      </p>
      <p>
        Service providers can register on our platform by paying a mandatory subscription fee, ensuring that only qualified and 
        reliable professionals are listed. Clients can browse through a wide range of services and hire professionals with just a 
        few clicks.
      </p>
      <h2>Our Vision</h2>
      <p>
        To create a connected world where service providers and clients can interact seamlessly, fostering trust, efficiency, and 
        convenience.
      </p>
      <h2>Our Mission</h2>
      <p>
        To provide a platform that empowers service providers to showcase their skills and helps clients find the best professionals 
        for their needs.
      </p>
    </div>
  );
};

export default AboutUs;