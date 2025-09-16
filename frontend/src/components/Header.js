import React, { useState, useRef } from 'react';
import '../styles/Header.css';

const Header = () => {
  const [showList, setShowList] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const handleFocus = () => {
    setShowList(true);
  };

  const handleBlur = (e) => {
    setTimeout(() => {
      if (
        inputRef.current && !inputRef.current.contains(e.relatedTarget) &&
        listRef.current && !listRef.current.contains(e.relatedTarget)
      ) {
        setShowList(false);
      }
    }, 100);
  };

  const handleButtonClick = () => {
    console.log('Search button clicked');
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowList(false); 
  };

  return (
    <div className="header">
      <div className="header-contents">
        <h1>Welcome to ProConnect!</h1>
        <p>Your one-stop platform to find service providers for any task.</p>
        <div className="search-container">
          <input
            ref={inputRef}
            name="search"
            placeholder="What service do you need?"
            type="text"
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={selectedItem} 
            onChange={(e) => setSelectedItem(e.target.value)} 
          />
          <button type="button" onClick={handleButtonClick}>
            <i className="fa fa-search" aria-hidden="true"></i> 
          </button>
          {showList && (
            <ul ref={listRef} className="dropdown-list">
              {['Driver', 'Mechanic', 'Plumbing', 'Painting', 'Electrical Repair', 'Cleaning', 'Catering', 'Furniture Repair', 'Movers'].map((item) => (
                <li key={item} onClick={() => handleItemClick(item)}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
