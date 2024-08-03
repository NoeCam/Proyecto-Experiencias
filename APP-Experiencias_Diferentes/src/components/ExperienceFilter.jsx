import { useState } from "react";

const ExperienceFilter = ({ setSearch, setOrder, setDirection }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orderValue, setOrderValue] = useState("");
  const [directionValue, setDirectionValue] = useState("");

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
    <div className="flex justify-center m-2">
      <input
        className="rounded-3xl bg-slate-200 my-1 mx-1 px-3 w-36 md:w-64 lg:w-80"
        type="text"
        placeholder="Search"
        onChange={handleSearchChange}
      />
      <select
        className="rounded-l-3xl bg-slate-200 my-1 pl-3 border-transparent"
        onChange={handleOrderChange}
      >
        <option value="">Order by</option>
        <option value="date">Date</option>
        <option value="price">Price</option>
        <option value="location">Location</option>
      </select>
      <select
        className="rounded-r-3xl bg-slate-200 my-1 mr-1 pr-3"
        onChange={handleDirectionChange}
      >
        <option value="ASC">Asc</option>
        <option value="DESC">Desc</option>
      </select>
    </div>
  );
};

export default ExperienceFilter;
