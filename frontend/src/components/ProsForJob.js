import React from 'react';
import '../styles/ProsForJob.css';
import { useParams } from 'react-router-dom';
import { job_list } from '../assets/assets'; 
import { pro_list } from '../assets/assets';

const ProsForJob = () => {
  const { id } = useParams(); 
  

  const job = job_list.find((job) => job._id === id);

  if (!job) {
    return <div>Job not found.</div>;
  }

  const filteredPros = pro_list.filter((pro) => pro.category === job.category);

  return (
    <div className="pros-for-job">
      <h2>Available Professionals for {job.name}</h2>

      <div className="pro-list">
        {filteredPros.length > 0 ? (
          filteredPros.map((pro) => (
            <div key={pro._id} className="pro-item">
              <h4>{pro.name}</h4>
              <p>Profession: {pro.profession}</p>
              <p>Location: {pro.location}</p>
              <p>Rating: {pro.rating} ★</p>
              <p>{pro.description}</p>

              
              <button className="contact-btn">
                Contact
              </button>
            </div>
          ))
        ) : (
          <p>No professionals found in your area for this job.</p>
        )}
      </div>
    </div>
  );
};

export default ProsForJob;
