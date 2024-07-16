import { useState, useEffect } from "react";

const HomeExperiences = () => {
  const { VITE_API_URL } = import.meta.env;
  const [experiences, setExperiences] = useState(null);
  useEffect(() => {
    const getAllExperiences = async () => {
      const response = await fetch(`${VITE_API_URL}/experiencias`);
      const json = await response.json();
      setExperiences(json.data.experiences);
    };
    getAllExperiences();
  }, []);

  return (
    <>
      <h1>See all different experiences</h1>
      {experiences &&
        experiences?.map((experience) => (
          <div key={experience.id}>
            <h3>Title: {experience.title}</h3>
            <p>Location: {experience.location}</p>
            <p>Description: {experience.description}</p>
            <p>image: {experience.image}</p>
            <p>date: {experience.date}</p>
            <p>price: {experience.price}</p>
            <p>active: {experience.active}</p>
            <p>rating: {experience.rating}</p>
            <p>availablePlaces: {experience.availablePlaces}</p>
            <p>confirmed: {experience.confirmed}</p>
          </div>
        ))}
    </>
  );
};

export default HomeExperiences;
