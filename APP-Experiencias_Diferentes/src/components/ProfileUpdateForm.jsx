import { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const ProfileUpdateForm = () => {
  // Acceso al contexto de autenticación
  const { token, userLogged, updateUserLogged } = useContext(AuthContext);

  // Estados para manejar los datos del formulario y el estado de carga
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Hook para la navegación
  const navigate = useNavigate();

  // useEffect para cargar los datos del perfil del usuario cuando se monta el componente
  useEffect(() => {
    if (userLogged) {
      setError("");
    } else {
      setError(error.message || "You must be logged");
      toast.error(error.message || "You must be logged");

      setTimeout(() => {
        navigate("/");
      }, 2000);
      return;
    }
    const fetchUserData = async () => {
      try {
        setLoading(true); // Comienza la carga
        const url = `${import.meta.env.VITE_API_URL}/users/profile`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token, // Enviar token para la autenticación
          },
        });

        if (response.ok) {
          const userData = await response.json();

          // Rellenar los estados con los datos del usuario
          setUsername(userData.data.user.username || "");
          setFirstname(userData.data.user.firstname || "");
          setLastname(userData.data.user.lastname || "");
          setEmail(userData.data.user.email || "");
        } else {
          const errorData = await response.json();
          toast.error(
            `Failed to load user data: ${errorData.message || "Unknown error"}`
          );
        }
      } catch (error) {
        toast.error("Error loading user data");
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchUserData();
  }, [token]); // Se ejecuta cuando cambia el token

  // Función para manejar la actualización del perfil del usuario
  const handleEditProfile = async (updatedData) => {
    try {
      setLoading(true); // Comienza la carga
      const url = `${import.meta.env.VITE_API_URL}/users/profile`;

      const formData = new FormData();
      // Añadir datos al FormData para enviarlos al servidor
      formData.append("username", updatedData.username);
      formData.append("firstname", updatedData.firstname);
      formData.append("lastname", updatedData.lastname);
      formData.append("email", updatedData.email);
      if (updatedData.avatar) {
        formData.append("avatar", updatedData.avatar);
      }

      const response = await fetch(url, {
        method: "PUT", // Método PUT para actualizar los datos
        headers: {
          Authorization: token, // Enviar token para la autenticación
        },
        body: formData, // Enviar los datos del formulario
      });

      if (response.ok) {
        const updatedUser = await response.json();
        updateUserLogged(updatedUser.data.user); // Actualiza el contexto con los nuevos datos del usuario
        toast.success("Profile updated successfully");
        setTimeout(() => {
          navigate("/users/profile"); // Redirige al perfil del usuario después de 3 segundos
        }, 3000);
      } else {
        const textResponse = await response.text();
        let errorData = {};

        if (textResponse) {
          try {
            errorData = JSON.parse(textResponse);
          } catch (jsonError) {
            toast.error(`Failed to parse error response: ${errorData.message}`);
            return;
          }
        } else {
          toast.error(`Received empty error response: ${errorData.message}`);
          return;
        }

        toast.error(
          `Failed to update profile: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      toast.error(`Error updating profile: ${error.message}`);
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Crea un objeto con los datos actualizados del usuario
    const updatedData = {
      username,
      firstname,
      lastname,
      email,
      avatar,
    };
    handleEditProfile(updatedData); // Llama a la función para actualizar el perfil
  };

  return (
    <>
      <h1 className="flex font-titleLicorice text-5xl font-black justify-center text-white tracking-wider mt-5">
        E<span className="text-yellow-500">x</span>periencias
      </h1>
      <h2 className="flex font-titleLicorice text-5xl font-black justify-center text-white tracking-wider mb-3">
        {" "}
        <span className="text-cyan-500">D</span>iferentes
      </h2>
      <h3 className="h3">Update Profile</h3>
      <div className="flex sm:justify-center ">
        <div className="div-content">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                className="input"
                type="text"
                name="username"
                placeholder="Enter username"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="firstname">First Name:</label>
              <input
                className="input"
                type="text"
                name="firstname"
                placeholder="Enter first name"
                value={firstname}
                required
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastname">Last Name:</label>
              <input
                className="input"
                type="text"
                name="lastname"
                placeholder="Enter last name"
                value={lastname}
                required
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Enter email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="avatar">Avatar:</label>
              <input
                className="input"
                type="file"
                accept="image/*"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </div>
            <div className="text-center">
              <button className="blue-Button" type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
            <ToastContainer />
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdateForm;
