import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../contexts/AuthContextProvider";
import makeReservationService from "../services/makeReserevationService";
import getExperienceService from "../services/getExperienceService";

// Importa los componentes ToastContainer y toast de react-toastify para mostrar notificaciones
import { ToastContainer, toast } from "react-toastify";

const GetExperienceById = () => {
  // Ruta al Back
  const { VITE_API_URL } = import.meta.env;

  // Obtención del token
  const { userLogged, token } = useContext(AuthContext);

  // Obtención de la experiencia elegida
  const { experienceId } = useParams();

  // Estado para la respuesta de la API
  const [experience, setExperience] = useState("");

  // Estado para los datos del formulario
  const [reservation, setReservation] = useState({
    quantityPerPerson: 0,
    state: false,
  });

  // Estado para los errores
  const [error, setError] = useState("");

  // Efecto para obtener los detalles de la experiencia cuando el componente se monta
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        // Llamar al servicio para obtener los detalles de la experiencia
        const experience = await getExperienceService(experienceId, token);

        setExperience(experience);
      } catch (error) {
        // Establecer el error en el estado
        setError(error.message);
        toast.error("Failed to fetch experience");
      }
    };
    fetchExperience();
  }, [experienceId, userLogged]);

  const handleClick = async () => {
    // Verificar si hay plazas disponibles antes de intentar reservar
    if (experience.availablePlaces <= 0) {
      toast.error("No available places left");
      return;
    }
    setReservation({ ...reservation, state: true });

    try {
      const json = await makeReservationService(
        token,
        experienceId,
        reservation
      );

      setError(null);

      // Muestra un mensaje de éxito si el registro es exitoso
      if (json.status === "ok") {
        toast.success(json.message);

        // Actualiza los lugares disponibles y que fue reservado por el usuario
        setExperience((prevExperience) => ({
          ...prevExperience,
          availablePlaces:
            prevExperience.availablePlaces - reservation.quantityPerPerson,
          reservedByMe: true,
        }));

        // Resetea la cantidad de reserva
        setReservation({
          quantityPerPerson: 0,
          state: false,
        });
      }
    } catch (error) {
      toast.error("Reservation failed");
    }
  };

  const changeNumber = (amount) => {
    if (amount == -1 && experience.availablePlaces == 0) {
      return;
    }
    if (
      amount == 1 &&
      experience.availablePlaces == reservation.quantityPerPerson
    ) {
      return;
    }

    if (reservation.quantityPerPerson <= 0 && amount == -1) {
      return;
    }

    setReservation({
      ...reservation,
      quantityPerPerson: reservation.quantityPerPerson + amount,
    });
  };

  return (
    <>
      <h3>Your selection: {experience.title}</h3>
      <img
        src={
          experience.image
            ? `${VITE_API_URL}/uploads/${experience.image}`
            : "The experience does not contain images"
        }
        alt={experience.title}
      />
      <p>Location: {experience.location}</p>
      <p>Description: {experience.description}</p>
      <p>Date: {experience.date}</p>
      <p>Price: {experience.price}</p>
      <p>Active: {experience.active}</p>
      <p>Rating: {experience.rating}</p>
      <p>
        Available Places:{" "}
        {experience.availablePlaces > 0
          ? experience.availablePlaces - reservation.quantityPerPerson
          : experience.availablePlaces}
      </p>
      <p>Confirmed: {experience.confirmed}</p>
      {userLogged ? (
        <div>
          <p>valoratedByMe: {experience.valoratedByMe}</p>
          <p>reservedByMe: {experience.reservedByMe ? "Yes" : "No"}</p>
          <label>Number of Places to reserve:</label>
          <div>
            <button
              onClick={() => changeNumber(-1)}
              disabled={reservation.quantityPerPerson <= 0}
            >
              -
            </button>
            <input
              type="number"
              name="reservations"
              value={reservation.quantityPerPerson}
              readOnly
              required
            />
            <button
              onClick={() => changeNumber(1)}
              disabled={
                reservation.quantityPerPerson >= experience.availablePlaces
              }
            >
              +
            </button>
          </div>
          <input
            className="blue-Button"
            type="submit"
            value="Reserve"
            onClick={handleClick}
            disabled={experience.availablePlaces <= 0}
          />
        </div>
      ) : (
        ""
      )}
      {userLogged?.role && userLogged.role === "admin" ? (
        <Link to={`/experiencias/edit/${experienceId}`}>
          Edit your experience
        </Link>
      ) : (
        ""
      )}
      <ToastContainer />
    </>
  );
};

export default GetExperienceById;
