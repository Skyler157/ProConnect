const express = require('express');
const Job = require('../models/Job');
const router = express.Router();

// Create a job listing
router.post('/create', async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: 'Error creating job', error });
  }
});

// Get all jobs
router.get('/all', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
});

module.exports = router;
