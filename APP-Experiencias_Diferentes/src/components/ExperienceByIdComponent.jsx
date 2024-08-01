import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../contexts/AuthContextProvider";
import makeReservationService from "../services/makeReserevationService";
import getExperienceService from "../services/getExperienceService";
import { RatingValue, DefaultRating, ReadonlyRating } from "./RatingStar";

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
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const yearExperience = parseInt(experience.date?.split("-")[0]);
  const monthExperience = parseInt(experience.date?.split("-")[1]);
  const dayExperience = parseInt(experience.date?.split("-")[2]);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  return (
    <>
      <h1 className="flex font-titleLicorice text-5xl font-black justify-center my-3 text-white tracking-wider">
        E<span className="text-yellow-500">x</span>periencias <>&nbsp;</>
        <span className="text-cyan-500 mb-5">D</span>iferentes
      </h1>
      <h3 className="h3">Your selection: {experience.title}</h3>
      <div className="div-content">
        <img
          className="rounded-3xl"
          src={
            experience.image
              ? `${VITE_API_URL}/uploads/${experience.image}`
              : "The experience does not contain images"
          }
          alt={experience.title}
        />
        <p>Location: {experience.location}</p>
        <p>Description: {experience.description}</p>
        <p>Date: {formatDate(experience.date)}</p>
        {reservation.userId == userLogged &&
        (yearExperience < year ||
          (yearExperience === year && monthExperience < month) ||
          (yearExperience === year &&
            monthExperience === month &&
            dayExperience < day)) ? (
          <div>
            <h3>Value the experience</h3> <RatingValue />{" "}
          </div>
        ) : (
          <div>
            <h3>Experience's ratings</h3> <ReadonlyRating />
          </div>
        )}
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
          <div className="flex flex-col items-center justify-center">
            <p>valoratedByMe: {experience.valoratedByMe}</p>
            <p>reservedByMe: {experience.reservedByMe ? "Yes" : "No"}</p>
            <label>Number of Places to reserve:</label>
            <div>
              <button
                onClick={() => changeNumber(-1)}
                disabled={reservation.quantityPerPerson <= 0}
              >
                <img
                  className="icon-NavBar"
                  src="/src/assets/iconMinusReservations.svg"
                  alt="-"
                />
              </button>
              <input
                className="bg-slate-300 mx-1 my-3 w-12 md:w-64 lg:w-80 text-center rounded-3xl"
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
                <img
                  className="icon-NavBar"
                  src="/src/assets/iconPlusReservations.svg"
                  alt="+"
                />
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
          <Link
            className="blue-Button"
            to={`/experiencias/edit/${experienceId}`}
          >
            Edit your experience
          </Link>
        ) : (
          ""
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default GetExperienceById;
