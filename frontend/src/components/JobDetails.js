import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/JobDetails.css';

const counties = [
  'Mombasa', 'Kwale', 'Kilifi', 'Tana River', 'Lamu', 'Taita Taveta', 'Garissa',
  'Wajir', 'Mandera', 'Marsabit', 'Isiolo', 'Meru', 'Tharaka Nithi', 'Embu',
  'Kitui', 'Machakos', 'Makueni', 'Nyandarua', 'Nyeri', 'Kirinyaga', 'Murang\'a',
  'Kiambu', 'Turkana', 'West Pokot', 'Samburu', 'Trans Nzoia', 'Uasin Gishu',
  'Elgeyo Marakwet', 'Nandi', 'Baringo', 'Laikipia', 'Nakuru', 'Narok', 'Kajiado',
  'Kericho', 'Bomet', 'Kakamega', 'Vihiga', 'Bungoma', 'Busia', 'Siaya', 'Kisumu',
  'Homa Bay', 'Migori', 'Kisii', 'Nyamira', 'Nairobi'
];

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    county: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {

    console.log(formData);
    navigate(`/pros-for-job/${id}`);
  };

  return (
    <div className="job-details">
      <h2>Enter Your Information </h2>

      <form onSubmit={(e) => e.preventDefault()} className="job-details-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="county">County</label>
          <select
            id="county"
            name="county"
            value={formData.county}
            onChange={handleInputChange}
            required
          >
            <option value="">Select your county</option>
            {counties.map((county, index) => (
              <option key={index} value={county}>
                {county}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            required
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!formData.name || !formData.county || !formData.description}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default JobDetails;
