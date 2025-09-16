import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import '../styles/Dashboard.css';

const Dashboard = ({ profileData, setProfileData }) => {
  const [services, setServices] = useState([]);
  const [availability, setAvailability] = useState(new Date());
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');

  // This useEffect runs every time profileData changes
  useEffect(() => {
    if (profileData) {
      setServices(profileData.services || []);
    }
  }, [profileData]);

  // Show a loading state if profileData is not available
  if (!profileData) {
    return <div>Loading profile...</div>;
  }

  const addService = () => {
    if (newServiceName && newServicePrice) {
      const newService = {
        id: Date.now(),
        name: newServiceName,
        price: parseFloat(newServicePrice),
      };
      setServices([...services, newService]);
      setNewServiceName('');
      setNewServicePrice('');
    }
  };

  const removeService = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  return (
    <div className="dashboard">
      <h1>Welcome to Your Dashboard, {profileData?.name || 'Professional'}!</h1>
      <div className="profile-overview">
        <img
          src={`http://localhost:5000/${profileData?.profileImage}`}
          alt=""
          className="profile-image"
        />
        <div className="profile-info">
          <h2>{profileData?.name || 'Your Name'}</h2>
          <p>{profileData?.service || 'Your Professional Role'}</p>
        </div>
      </div>

      {/* Service Management */}
      <div className="service-management">
        <h2>Manage Your Services</h2>
        <div>
          <input
            type="text"
            placeholder="Service Name"
            value={newServiceName}
            onChange={(e) => setNewServiceName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Service Price"
            value={newServicePrice}
            onChange={(e) => setNewServicePrice(e.target.value)}
          />
          <button onClick={addService}>Add New Service</button>
        </div>
        <ul>
          {services.map((service) => (
            <li key={service.id}>
              {service.name} - {service.price}
              <button onClick={() => removeService(service.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="availability">
        <h2>Set Your Availability</h2>
        <Calendar onChange={setAvailability} value={availability} />
      </div>

      <div className="settings-links">
        <Link to="/account-settings">Account Settings</Link>
        <Link to="/logout">Logout</Link>
      </div>
    </div>
  );
};

export default Dashboard;
