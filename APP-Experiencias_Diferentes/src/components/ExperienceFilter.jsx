const ExperienceFilter = ({ setSearch, setOrder, setDirection }) => {
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const handleDirectionChange = (e) => {
    setDirection(e.target.value);
  };

  return (
    <div>
      <input type="text" placeholder="Search" onChange={handleSearchChange} />
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
