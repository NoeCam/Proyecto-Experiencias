import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";
import Header from "./Header";

const HomeExperiences = () => {
  const { VITE_API_URL } = import.meta.env;

  const { userLogged } = useContext(AuthContext);
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
      <Header />
      <h1>Experiencias Diferentes</h1>
      <h2>See all different experiences</h2>
      {experiences &&
        experiences?.map((experience) => (
          <div key={experience.id}>
            <h3>Title: {experience.title}</h3>
            <p>Location: {experience.location}</p>
            <p>Description: {experience.description}</p>
            <img
              src={
                experience.image
                  ? `${import.meta.env.VITE_API_URL}/uploads/${
                      experience.image
                    }`
                  : "The experience does not contain images"
              }
              alt={experience.title}
            />
            <p>date: {experience.date}</p>
            <p>price: {experience.price}</p>
            <p>active: {experience.active}</p>
            <p>rating: {experience.rating}</p>
            <p>availablePlaces: {experience.availablePlaces}</p>
            <p>confirmed: {experience.confirmed}</p>
            {userLogged ? (
              <div>
                <p>valoratedByMe: {experience.valoratedByMe}</p>
                <p>reservedByMe: {experience.reservedByMe}</p>
              </div>
            ) : (
              ""
            )}
            <Link to={`/experiencias/${experience.id}`}>
              Watch this experience
            </Link>
          </div>
        ))}
    </>
  );
};

export default HomeExperiences;
