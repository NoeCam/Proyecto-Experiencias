import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";
import Header from "./Header";

const GetExperienceById = () => {
  const { VITE_API_URL } = import.meta.env;

  const { experienceId } = useParams();
  const [experience, setExperience] = useState("");
  const { userLogged } = useContext(AuthContext);

  useEffect(() => {
    const getExperience = async () => {
      const response = await fetch(
        `${VITE_API_URL}/experiencias/${experienceId}`
      );
      const json = await response.json();

      setExperience(json.data["experience"][0]);
    };
    getExperience();
  }, [experienceId]);

  return (
    <>
      <Header />
      <h3>Your selection: {experience.title}</h3>
      {userLogged ? (
        <Link to={`/experiencias/edit/${experienceId}`}>
          Edit your experience
        </Link>
      ) : (
        ""
      )}
    </>
  );
};

export default GetExperienceById;
