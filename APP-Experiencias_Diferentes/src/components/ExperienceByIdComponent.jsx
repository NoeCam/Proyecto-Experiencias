import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const GetExperienceById = () => {
  const { VITE_API_URL } = import.meta.env;

  const { experienceId } = useParams();
  const [experience, setExperience] = useState('');

  useEffect(() => {
    const getExperience = async () => {
      const response = await fetch(
        `${VITE_API_URL}/experiencias/${experienceId}`
      );
      const json = await response.json();

      setExperience(json.data['experience'][0]);
    };
    getExperience();
  }, [experienceId]);


  return (
    <>
      <h3>Your selection: {experience.title}</h3>
      <Link to={`/experiencias/edit/${experienceId}`}>Edit your experience</Link>
    </>
  );
};

export default GetExperienceById;
