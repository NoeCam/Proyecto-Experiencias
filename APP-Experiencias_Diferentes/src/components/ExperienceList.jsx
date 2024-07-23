import { useState, useEffect } from 'react';
import getExperiences from '../services/experienceService';
import ExperienceFilter from './ExperienceFilter';

//Componente que muestra listado de exp, permitiendo aplicar filtros y ordenaciones

const ExperienceList = () => {
  const [experiences, setExperiences] = useState([]);
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('');
  const [direction, setDirection] = useState('');

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const experiences = await getExperiences(search, order, direction);
        setExperiences(experiences);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      }
    };

    fetchExperiences();
  }, [search, order, direction]);

  return (
    <div>
      <ExperienceFilter setSearch={setSearch} setOrder={setOrder} setDirection={setDirection} />
      <ul>
        {experiences.map((experience) => (
          <li key={experience.id}>
            <h2>{experience.title}</h2>
            <p>{experience.description}</p>
            <p>{experience.location}</p>
            <p>{experience.date}</p>
            <p>{experience.price}</p>
            <p>{experience.availablePlaces} places available</p>
            <p>Rating: {experience.rating}</p>
            <p>{experience.active ? 'Active' : 'Inactive'}</p>
            <p>{experience.confirmed ? 'Confirmed' : 'Not Confirmed'}</p>
            <p>{experience.reservedByMe ? 'Reserved' : 'Not Reserved'}</p>
            <p>{experience.valoratedByMe ? 'Valorated' : 'Not Valorated'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceList;
