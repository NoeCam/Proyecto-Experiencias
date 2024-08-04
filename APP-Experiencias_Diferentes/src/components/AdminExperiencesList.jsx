import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContextProvider';
import getAdminExperiencesService from '../services/getAdminExperiencesService';
import { ToastContainer, toast } from 'react-toastify';

const AdminExperiencesList = () => {
  const { token } = useContext(AuthContext);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const experiencesData = await getAdminExperiencesService(token);
        setExperiences(experiencesData);
      } catch (error) {
        toast.error('Error fetching experiences');
      }
    };

    fetchExperiences();
  }, [token]);

  return (
    <div>
      <h1>Experiencias Reservadas</h1>
      <ul>
        {experiences.map((experience) => (
          <li key={experience.id}>
            <h2>{experience.title}</h2>
            <p>{experience.description}</p>
            <p>Ubicación: {experience.location}</p>
            <p>Fecha: {new Date(experience.date).toLocaleDateString()}</p>
            <p>Precio: €{experience.price}</p>
            <p>Reservas:</p>
            {/* <ul>
              {experience.reservations && experience.reservations.map((reservation) => (
                <li key={reservation.reservationId}>
                  <p>ID de Reserva: {reservation.reservationId}</p>
                  <p>ID de Usuario: {reservation.reservationUserId}</p>
                  <p>Cantidad por Persona: {reservation.quantityPerPerson}</p>
                  <p>Estado: {reservation.state}</p>
                </li>
              ))}
            </ul> */}
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default AdminExperiencesList;
