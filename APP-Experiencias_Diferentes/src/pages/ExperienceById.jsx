import { useParams } from "react-router-dom";
import GetExperienceById from "../components/ExperienceByIdComponent";

const ExperienceById = () => {
    // Establecer la respuesta en el estado
  const { experienceId } = useParams();

  return (
    <div>
      <h1> Experience</h1>
      <GetExperienceById />
    </div>
  );
};

export default ExperienceById;