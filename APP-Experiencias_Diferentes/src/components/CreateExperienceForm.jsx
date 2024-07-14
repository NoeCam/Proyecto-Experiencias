import { useState } from "react";
import createExperienceService from "../services/createExperienceService";

const CreateExperienceForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    image: '',
    date: '',
    price: '',
    numMinPlaces: '',
    numTotalPlaces: ''
  });
  const [error, setError] = useState('');
  const [resp, setResp] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createExperienceService(formData);
      setResp(response);
    } catch (error) {
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
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
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