import { useParams } from "react-router-dom";
import GetExperienceById from "../components/ExperienceByIdComponent";

const ExperienceById = () => {
  // Establecer la respuesta en el estado
  const { experienceId } = useParams();

  return (
    <div>
      <GetExperienceById />
    </div>
  );
};

export default ExperienceById;
