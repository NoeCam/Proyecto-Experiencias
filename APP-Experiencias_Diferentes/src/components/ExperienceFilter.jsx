import { useState } from 'react';

const ExperienceFilter = ({ setSearch, setOrder, setDirection }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderValue, setOrderValue] = useState('');
  const [directionValue, setDirectionValue] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSearch(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrderValue(e.target.value);
    setOrder(e.target.value);
  };

  const handleDirectionChange = (e) => {
    setDirectionValue(e.target.value);
    setDirection(e.target.value);
  };

  return (
    <div>
      <input type="text" placeholder="Search Location" onChange={handleSearchChange} />
      <select onChange={handleOrderChange}>
        <option value="">Order by</option>
        <option value="date">Date</option>
        <option value="price">Price</option>
        <option value="location">Location</option>
      </select>
      <select onChange={handleDirectionChange}>
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
    </div>
  );
};

export default ExperienceFilter;
