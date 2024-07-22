import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import updateExperienceService from "../services/updateExperienceService";
import getExperienceService from "../services/getExperienceService"; // Suponiendo que tienes un servicio para obtener los detalles de una experiencia
import { AuthContext } from "../contexts/AuthContextProvider";
import Header from "./Header";

const EditExperienceForm = () => {
  const { experienceId } = useParams();
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    image: "",
    date: "",
    price: "",
    numMinPlaces: "",
    numTotalPlaces: "",
    confirmedByAdmin: false,
  });

  // Estado para los errores
  const [error, setError] = useState("");
  // Estado para la respuesta de la API
  const [resp, setResp] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);
  const { userLogged, token } = useContext(AuthContext);

  // Efecto para obtener los detalles de la experiencia cuando el componente se monta
  useEffect(() => {
    // Verificar si el usuario es administrador

    if (userLogged?.role && userLogged.role === "admin") {
      setIsAdmin(true);
    } else {
      setError("You do not have permission to edit an experience.");
      return;
    }

    const fetchExperience = async () => {
      try {
        // Llamar al servicio para obtener los detalles de la experiencia
        const experience = await getExperienceService(experienceId, token);

        // Asegúrate de que la estructura de datos coincida con formData
        setFormData({
          title: experience.title || "",
          location: experience.location || "",
          description: experience.description || "",
          image: experience.image || "",
          date: experience.date
            ? new Date(experience.date).toISOString().split("T")[0]
            : "",
          price: experience.price || "",
          numMinPlaces: experience.numMinPlaces || "",
          numTotalPlaces: experience.numTotalPlaces || "",
          confirmedByAdmin: experience.confirmedByAdmin || false,
        });
      } catch (error) {
        // Establecer el error en el estado
        setError(error.message);
      }
    };
    fetchExperience();
  }, [experienceId, userLogged]);

  // Manejar cambios en el campo imagen
  const handleChangeImage = (e) => {
    setFormData({
      ...formData,
      ["image"]: e.target.files[0],
    });
  };

  // Manejar cambios en el campos del formulario booleano
  const handleChangeBoolean = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      setError("You do not have permission to edit an experience.");
      return;
    }
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      const response = await updateExperienceService(
        token,
        experienceId,
        formDataToSend
      );

      // Establecer la respuesta en el estado
      setResp(response);
      setError(null);
    } catch (error) {
      // Establecer el error en el estado
      setError(error.message);
    }
  };

  if (!isAdmin) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Header />
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
          <label>Image URL:</label>
          <input
            type="file"
            name="image"
            onChange={handleChangeImage}
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
          <label>Confirmed by Admin:</label>
          <input
            type="checkbox"
            name="confirmedByAdmin"
            checked={formData.confirmedByAdmin}
            onChange={handleChangeBoolean}
          />
        </div>
        <div>
          <input type="submit" value="Edit Experience" />
        </div>
        <div>
          {error ? <p>{error}</p> : ""}
          {resp.status === "ok" ? <p>{resp.message}</p> : ""}
        </div>
      </form>
    </>
  );
};

export default EditExperienceForm;
