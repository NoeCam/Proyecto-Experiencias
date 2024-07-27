import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";
import Header from "./Header";
import ExperienceFilter from "./ExperienceFilter";
import getExperiences from "../services/experienceService";

const HomeExperiences = () => {
  const { VITE_API_URL } = import.meta.env;

  const { userLogged } = useContext(AuthContext);
  const [experiences, setExperiences] = useState(null);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");
  const [direction, setDirection] = useState("");
  const [error, setError] = useState("");
  console.log("userLogged HomeExperience", userLogged);
  const fetchExperiences = async () => {
    try {
      const entries = await getExperiences(search, order, direction);
      setExperiences(entries);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, [search, order, direction]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <>
      <Header />
      <h1>Experiencias Diferentes</h1>
      <h2>See all different experiences</h2>
      <ExperienceFilter
        setSearch={setSearch}
        setOrder={setOrder}
        setDirection={setDirection}
      />

      {error && <p>{error}</p>}

      {experiences &&
        experiences.map((experience) => (
          <div key={experience.id}>
            <h3>Title: {experience.title}</h3>
            <p>Location: {experience.location}</p>
            <p>Description: {experience.description}</p>
            <img
              src={
                experience.image
                  ? `${VITE_API_URL}/uploads/${experience.image}`
                  : "The experience does not contain images"
              }
              alt={experience.title}
            />
            <p>Date: {formatDate(experience.date)}</p>
            <p>Price: {experience.price}</p>
            <p>Active: {experience.active ? "Yes" : "No"}</p>
            <p>Rating: {experience.rating}</p>
            <p>Available Places: {experience.availablePlaces}</p>
            <p>Confirmed: {experience.confirmed ? "Yes" : "No"}</p>
            {userLogged ? (
              <div>
                <p>
                  Valorated By Me: {experience.valoratedByMe ? "Yes" : "No"}
                </p>
                <p>Reserved By Me: {experience.reservedByMe ? "Yes" : "No"}</p>
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
