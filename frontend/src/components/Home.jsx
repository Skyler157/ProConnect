import React, {useState} from 'react';
import '../styles/Home.css';
import Header from './Header';
import BrowseCategory from './BrowseCategory';
import JobDisplay from './JobDisplay/JobDisplay';

const Home = () => {

  const [category, setCategory] = useState("All")

  return (
    <div className="home">
      <Header/>
      <BrowseCategory category={category} setCategory={setCategory} />
      <JobDisplay category={category} />
    </div>
  );
}

export default Home;
