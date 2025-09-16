import React, { useRef } from 'react';
import '../styles/BrowseCategory.css';
import { category_list } from '../assets/assets';

const BrowseCategory = ({ category, setCategory }) => {
  const listRef = useRef(null); // Reference to the category list container

  const scrollList = (direction) => {
    if (listRef.current) {
      const scrollAmount = 300; // Adjust the scroll distance (can be changed)
      listRef.current.scrollLeft += direction * scrollAmount;
    }
  };

  return (
    <div className="browse-category">
      <h1>Browse By Category</h1>
      <div className="browse-category-container">
        <button
          className="scroll-button left"
          onClick={() => scrollList(-1)} // Scroll left
        >
          &#10094; {/* Left arrow symbol */}
        </button>

        <div className="browse-category-list" ref={listRef}>
          {category_list.map((item, index) => (
            <div
              key={index}
              onClick={() => setCategory(item.category_name)}
              className={`browse-category-list-item ${category === item.category_name ? 'active' : ''}`}
            >
              <img src={item.category_image} alt={item.category_name} />
              <p>{item.category_name}</p>
            </div>
          ))}
        </div>

        <button
          className="scroll-button right"
          onClick={() => scrollList(1)} // Scroll right
        >
          &#10095; {/* Right arrow symbol */}
        </button>
      </div>
      <hr />
    </div>
  );
};

export default BrowseCategory;
