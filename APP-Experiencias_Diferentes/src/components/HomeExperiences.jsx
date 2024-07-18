import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";

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
      <header>
        {!userLogged ? (
          <nav>
            <Link to="/users/register">Sing in</Link>
            <>&nbsp;|&nbsp;</>
            <Link to="/users/login">Login</Link>
          </nav>
        ) : (
          ""
        )}
        {userLogged ? (
          <div>
            <div>{userLogged.username}</div>
            <Link to="/users/profile">User Profile</Link>
            <>&nbsp;|&nbsp;</>
            <Link to="/experiencias/create">Create a new experience</Link>
          </div>
        ) : (
          ""
        )}
      </header>
      <h1>Experiencias Diferentes</h1>
      <h2>See all different experiences</h2>
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
            {userLogged ? (
              <div>
                <p>valoratedByMe: {experience.valoratedByMe}</p>
                <p>reservedByMe: {experience.reservedByMe}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
    </>
  );
};

export default HomeExperiences;
