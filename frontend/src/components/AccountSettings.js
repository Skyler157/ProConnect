import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AccountSettings.css';

const AccountSettings = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    profileImage: '',
  });

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('proProfile'));
    if (data) {
      setProfileData(data);
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prevData) => ({
          ...prevData,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save updated profile data
  const handleSave = () => {
    localStorage.setItem('proProfile', JSON.stringify(profileData));
    alert('Profile updated successfully!');
    navigate('/dashboard'); // Redirect to dashboard after saving
  };

  return (
    <div className="account-settings">
      <h1>Account Settings</h1>
      <div className="profile-form">
        {/* Profile Image Upload */}
        <div className="form-group">
          <label htmlFor="profileImage">Profile Image</label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {profileData.profileImage && (
            <img
              src={profileData.profileImage}
              alt=""
              className="profile-image-preview"
            />
          )}
        </div>

        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={profileData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
          />
        </div>

        {/* Service */}
        <div className="form-group">
          <label htmlFor="service">Service You Provide</label>
          <input
            type="text"
            id="service"
            name="service"
            value={profileData.service}
            onChange={handleInputChange}
            placeholder="Enter your service"
          />
        </div>

        {/* Save Button */}
        <button onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default AccountSettings;