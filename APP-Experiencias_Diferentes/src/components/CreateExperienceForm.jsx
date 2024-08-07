import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { AuthContext } from "../contexts/AuthContextProvider";
import createExperienceService from "../services/createExperienceService";

// Estado para los datos del formulario
const CreateExperienceForm = () => {
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
  const navigate = useNavigate();

  useEffect(() => {
    //Verificar si el usuario es administrador

    if (userLogged?.role && userLogged.role === "admin") {
      setIsAdmin(true);
      setError("");
    } else {
      setError(error.message || "You need to do log in");
      toast.error(error.message || "You need to do log in");

      setTimeout(() => {
        navigate("/");
      }, 2000);
      return;
    }
  }, []);

  // Manejar cambios en el campo imagen
  const handleChangeImage = (e) => {
    setFormData({
      ...formData,
      ["image"]: e.target.files[0],
    });
  };

  // Manejar cambios en el campos del formulario booleano
  const handleChangeBoolean = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };
  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAdmin) {
      setError("You do not have permission to create an experience.");
      toast.error(error.message);
      return;
    }

    // Validar la fecha
    const experienceDate = new Date(formData.date);
    const currentDate = new Date();
    if (experienceDate <= currentDate) {
      toast.error("The date must be in the future.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      // Llamar al servicio para crear una experiencia
      const response = await createExperienceService(token, formDataToSend);
      const experienceId = response.data.experience.id;

      // Establecer la respuesta en el estado
      //setResp(response);
      setError(null);

      if (response.status == "ok") {
        toast.success(response.message);
        setTimeout(() => {
          navigate(`/experiencias/${experienceId}`);
        }, 2000); // 2000 milisegundos = 2 segundos
      } else {
        // Muestra un mensaje de error si el login falla
        toast.error("Failed redirection");
      }
    } catch (error) {
      // Establecer el error en el estado
      setError(error.message);
      toast.error(error.message);
    }
  };
  if (!isAdmin) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1 className="flex font-titleLicorice text-5xl font-black justify-center text-white tracking-wider mt-5">
        E<span className="text-yellow-500">x</span>periencias
      </h1>
      <h2 className="flex font-titleLicorice text-5xl font-black justify-center text-white tracking-wider mb-3">
        {" "}
        <span className="text-cyan-500">D</span>iferentes
      </h2>
      <h3 className="h3">Create New Experience</h3>
      <div className="flex sm:justify-center ">
        <div className="div-content">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title:</label>
              <input
                className="input"
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
                className="input"
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
                className="input"
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
                onChange={handleChangeImage}
                required
              />
            </div>
            <div className="mt-3">
              <label>Date:</label>
              <input
                className="input"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Price (€):</label>
              <input
                className="input"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Minimum Number of Places:</label>
              <input
                className="input"
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
                className="input"
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
            <div className="text-center">
              <input
                className="blue-Button"
                type="submit"
                value="Create Experience"
              />
            </div>
            <div>{error ? <p>{error}</p> : ""}</div>
            <div>
              {resp.status == "ok" ? (
                <>
                  <p>{resp.message}</p>
                </>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default CreateExperienceForm;
