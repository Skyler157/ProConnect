const express = require('express');
const router = express.Router();
const Pro = require('../models/Pro');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save images to the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename the file to avoid collisions
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('profileImage'), async (req, res) => {
  console.log('Received request to save professional data'); // Debug log
  try {
    const { name, email, password, phone, service, experience, location, bio } = req.body;
    let profileImage = null;

    console.log('Password received:', password); // Debug log

    // If there's a profile image uploaded, get its path
    if (req.file) {
      profileImage = req.file.path;
    }

    // Validate incoming data
    if (!name || !email || !password || !phone || !service || !experience || !location || !bio) {
      return res.status(400).json({
        message: 'All fields are required except profile image.',
      });
    }

    // Check if professional already exists
    const existingPro = await Pro.findOne({ email });
    if (existingPro) {
      return res.status(400).json({
        message: 'Professional already exists with this email.',
      });
    }

    // Create a new pro object using the data received
    const newPro = new Pro({
      name,
      email,
      password, // Include password
      phone,
      service,
      experience,
      location,
      bio,
      profileImage,
    });

    // Save the new pro to MongoDB
    await newPro.save();

    console.log('Professional saved:', newPro); // Debug log

    // Generate JWT token
    const token = jwt.sign({ id: newPro._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Return professional data (excluding password) and token
    const professionalData = newPro.toObject();
    delete professionalData.password;

    res.status(201).json({
      message: 'Professional profile created successfully!',
      professional: professionalData,
      token,
    });
  } catch (err) {
    console.error('Error saving professional profile:', err);
    res.status(500).json({
      message: 'There was an error saving your profile. Please try again.',
      error: err,
    });
  }
});

// POST route for logging in a professional
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Login request received:', { email, password }); // Debug log

  try {
    // Find professional by email
    const professional = await Pro.findOne({ email });
    if (!professional) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log('Professional found:', professional); // Debug log

    // Ensure the password field exists
    if (!professional.password) {
      console.error('Password field is missing in the database');
      return res.status(500).json({ message: 'Server error: Password field is missing' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, professional.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: professional._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Return professional data (excluding password) and token
    const professionalData = professional.toObject();
    delete professionalData.password;

    res.status(200).json({ token, professional: professionalData });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
