import { useParams } from "react-router-dom";
import EditExperienceForm from "../components/EditExperienceForm";

const EditExperience = () => {
  // Establecer la respuesta en el estado
  const { experienceId } = useParams();

  return (
    <div>
      <EditExperienceForm experienceId={experienceId} />
    </div>
  );
};

export default EditExperience;
