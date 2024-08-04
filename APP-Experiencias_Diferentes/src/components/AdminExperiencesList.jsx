import { useState, useEffect, useContext } from 'react';
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
            <p>Locate: {experience.location}</p>
            <p>Date: {new Date(experience.date).toLocaleDateString()}</p>
            <p>Price: €{experience.price}</p>
            <p>Reserve:</p>
            <ul>
              {experience.reservations.map((reservation) => (
                <li key={reservation.id}>
                  <p>ID Reserve: {reservation.reservationId}</p>
                  <p>ID User: {reservation.reservationUserId}</p>
                  <p>Quantity per person: {reservation.quantityPerPerson}</p>
                  <p>State: {reservation.state}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default AdminExperiencesList;
