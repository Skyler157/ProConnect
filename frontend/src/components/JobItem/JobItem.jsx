import React from 'react';
import { useNavigate } from 'react-router-dom';
import './JobItem.css';

const JobItem = ({ id, name, image, description, category, isSmallImage }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/job/${id}`);
  };

  return (
    <div className="job-item" onClick={handleClick}>
      <div className="job-item-img-container">
        <img
          className={`job-item-image ${isSmallImage ? 'small-image' : ''}`}
          src={image}
          alt={name}
        />
      </div>
      <div className="job-item-info">
        <div className="job-item-name-rating">
          <p>{name}</p>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
          </div>
        </div>
        <p className="job-item-desc">{description}</p>
      </div>
    </div>
  );
};

export default JobItem;
