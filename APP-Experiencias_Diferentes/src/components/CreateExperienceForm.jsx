import { useState } from "react";
import createExperienceService from "../services/createExperienceService";

// Estado para los datos del formulario
const CreateExperienceForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    image: '',
    date: '',
    price: '',
    numMinPlaces: '',
    numTotalPlaces: ''
  });

  // Estado para los errores
  const [error, setError] = useState('');
  // Estado para la respuesta de la API
  const [resp, setResp] = useState('');

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llamar al servicio para crear una experiencia
      const response = await createExperienceService(formData);
       // Establecer la respuesta en el estado
      setResp(response);
    } catch (error) {
      // Establecer el error en el estado
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Image:</label>
        <input
          type="file"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Minimum Number of Places:</label>
        <input
          type="number"
          name="numMinPlaces"
          value={formData.numMinPlaces}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Total Number of Places:</label>
        <input
          type="number"
          name="numTotalPlaces"
          value={formData.numTotalPlaces}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input type="submit" value="Create Experience" />
      </div>
      <div>
        {error ? <p>{error}</p> : ''}
      </div>
      <div>
        {resp.status === 'ok' ? <><p>{resp.message}</p></> : ''}
      </div>
    </form>
  );
};

export default CreateExperienceForm;