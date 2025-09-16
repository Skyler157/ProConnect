import React from 'react';
import './JobDisplay.css';
import JobItem from '../JobItem/JobItem';
import { job_list } from '../../assets/assets';

const JobDisplay = ({ category }) => {
  const filteredJobs = category === 'All'
    ? job_list.slice(0, 8) 
    : job_list.filter((job) => job.category === category).slice(0, 8); 

  return (
    <div className='job-display' id='job-display'>
      <h2 className="job-display-title">Popular Jobs</h2>
      <div className="job-display-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((item) => (
            <JobItem
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image}
              description={item.description}
              category={item.category}
            />
          ))
        ) : (
          <p className="no-jobs-message">No jobs available in this category</p>
        )}
      </div>
    </div>
  );
};

export default JobDisplay;
