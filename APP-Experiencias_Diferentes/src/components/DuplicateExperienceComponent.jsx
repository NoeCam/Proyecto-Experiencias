import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import { AuthContext } from "../contexts/AuthContextProvider";
import duplicateExperienceService from "../services/duplicateExperienceService";

const DuplicateExperienceComponent = () => {
  // Obtención del token
  const { userLogged, token } = useContext(AuthContext);

  // Obtención de la experiencia elegida
  const { experienceId } = useParams();

  // Estado para los errores
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleClick = async () => {
    // Verificar si es admin antes de poder duplicar

    if (!userLogged || !userLogged.role == "admin") {
      toast.error("You must be admin.");
      return;
    }

    try {
      const response = await duplicateExperienceService(token, experienceId);

      setError(null);

      if (response.status == "ok") {
        toast.success(response.message);

        setTimeout(() => {
          navigate(`/experiencias/${response.data.experience.id}`);
        }, 2000); // 2000 milisegundos = 2 segundos
      } else {
        // Muestra un mensaje de error si el redireccionado falla
        toast.error("Failed redirection");
      }
    } catch (error) {
      toast.error("duplicate failure");
    }
  };

  return (
    <button onClick={handleClick} className="blue-Button">
      Duplicate
    </button>
  );
};

export default DuplicateExperienceComponent;
