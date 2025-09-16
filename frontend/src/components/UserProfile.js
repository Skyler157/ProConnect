import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/UserProfile.css';

const UserProfile = ({ setProfileData }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    profileImage: null,
  });
  const [previewImage, setPreviewImage] = useState(null); // For previewing the uploaded image
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  // Fetch user profile data on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');  // Redirect to login page if no token exists
    } else {
      fetchUserProfile(token); // Fetch the user profile
    }
  }, [navigate]);

  // Fetch user profile
  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        setUser(response.data);
        if (response.data.profileImage) {
          setPreviewImage(response.data.profileImage); // Set preview image if it exists
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // Limit file size to 5MB
        alert('File size must be less than 5MB.');
        return;
      }
      setUser((prevUser) => ({
        ...prevUser,
        profileImage: file, // Store the file in the user state
      }));
      setPreviewImage(URL.createObjectURL(file)); // Set preview image
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData(); // Use FormData for file uploads
      formData.append('name', user.name);
      formData.append('email', user.email);
      formData.append('phone', user.phone);
      formData.append('location', user.location);
      formData.append('bio', user.bio);
      if (user.profileImage) {
        formData.append('profileImage', user.profileImage); // Append the image file
      }

      const response = await axios.put('http://localhost:5000/api/auth/update', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Set content type for file uploads
        },
      });

      alert('Profile updated successfully!');
      setUser(response.data); // Update user state with the new data
      if (response.data.profileImage) {
        setPreviewImage(response.data.profileImage);
        setProfileData(response.data); // Update profileData in App.js
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state until the data is fetched
  }

  return (
    <div className="user-profile-container">
      <h2>Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Profile Picture</label>
          <div className="profile-image-upload">
            {previewImage ? (
              <img
                src={`http://localhost:5000${previewImage}`}
                alt=""
                className="profile-preview"
              />
            ) : (
              <div className="profile-placeholder">No image selected</div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name || ''} // Ensure it's always a string
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email || ''} // Ensure it's always a string
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={user.phone || ''} // Ensure it's always a string
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={user.location || ''} // Ensure it's always a string
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={user.bio || ''} // Ensure it's always a string
            onChange={handleInputChange}
            rows="4"
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
