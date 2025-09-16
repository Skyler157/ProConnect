import React from 'react';
import '../styles/Service.css';
import { job_list } from '../assets/assets';

const Service = () => {
  return (
    <div className="services-page">
      {/* Header Section */}
      <div className="services-header">
        <h1>Services</h1>
        <p>Home &gt; Services</p>
      </div>

      {/* Services Grid */}
      <div className="services-grid">
        {job_list.map((job) => (
          <div key={job._id} className="service-card">
            <img src={job.image} alt={job.name} className="service-image" />
            <div className="service-info">
              <h3>{job.name}</h3>
              <p>{job.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
