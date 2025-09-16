const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');  // Import the auth routes
const proRoutes = require('./routes/proRoutes'); // Import the pro routes
const jobRoutes = require('./routes/jobRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); 

// MongoDB Connection
// mongoose.connect("")
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


// Routes
app.use('/api/auth', authRoutes);  // Register the auth routes here
app.use('/api/users', userRoutes);
app.use('/api/pro', proRoutes); // Register pro routes here
app.use('/api/job', jobRoutes);
app.use('/api/payment', paymentRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
