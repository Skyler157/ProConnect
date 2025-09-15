const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the Schema for professional data
const proSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Add password field
  phone: { type: String, required: true },
  service: { type: String, required: true },
  experience: { type: Number, required: true },
  location: { type: String, required: true },
  bio: { type: String, required: true },
  profileImage: { type: String },
});

// Hash password before saving
proSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10); // Hash the password
  }
  next();
});

const Pro = mongoose.model('Pro', proSchema);

module.exports = Pro;