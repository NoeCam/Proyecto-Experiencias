import { useState, useContext } from "react";
import { toast } from "react-toastify";

import { AuthContext } from "../contexts/AuthContextProvider";
import cancelExperienceService from "../services/cancelExperienceService";

const CancellationExperienceComponent = ({
  experienceId,
  state,
  reservationDate,
  changeState,
}) => {
  // Obtención del token
  const { token } = useContext(AuthContext);

  // Estado para los errores
  const [error, setError] = useState("");

  const handleClick = async () => {
    // Validaciones
    const currentDate = new Date();
    const reservationDateObj = new Date(reservationDate);
    const hoursDifference =
      (reservationDateObj - currentDate) / (1000 * 60 * 60);

    if (reservationDateObj < currentDate) {
      setError("Cannot cancel a reservation that has already passed.");
      toast.error("Cannot cancel a reservation that has already passed.");
      return;
    }

    const minimumHoursForCancellation = 24; // No se puede cancelar con 24 horas de antelación
    if (hoursDifference < minimumHoursForCancellation) {
      setError(
        `You must cancel at least ${minimumHoursForCancellation} hours in advance.`
      );
      toast.error(
        `You must cancel at least ${minimumHoursForCancellation} hours in advance.`
      );
      return;
    }

    try {
      const response = await cancelExperienceService(token, experienceId, {
        state: false,
      });
      setError(null);

      if (response.status == "ok") {
        toast.success(response.message);
        changeState(experienceId, false);
      }
    } catch (error) {
      setError(error.message);
      toast.error("Cancellation failed");
    }
  };

  return (
    <>
      {state && state == true ? (
        <button onClick={handleClick} className="blue-Button">
          Cancel
        </button>
      ) : (
        <button onClick={handleClick} className="red-Button" disabled>
          Cancelled
        </button>
      )}
    </>
  );
};

export default CancellationExperienceComponent;
