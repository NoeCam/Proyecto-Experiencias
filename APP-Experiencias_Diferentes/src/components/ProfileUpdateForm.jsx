import { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "../contexts/AuthContextProvider";

const ProfileUpdateForm = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  // Cargar datos del perfil cuando el componente se monta
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const url = `${import.meta.env.VITE_API_URL}/users/profile`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setUsername(userData.username || "");
          setFirstname(userData.firstname || "");
          setLastname(userData.lastname || "");
          setEmail(userData.email || "");
        } else {
          const errorData = await response.json();
          toast.error(
            `Failed to load user data: ${errorData.message || "Unknown error"}`
          );
        }
      } catch (error) {
        toast.error("Error loading user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const url = `${import.meta.env.VITE_API_URL}/users/profile`;

      const formData = new FormData();
      formData.append("username", username);
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      if (avatar) {
        formData.append("avatar", avatar);
      }

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success("Profile updated successfully");
        // Opcional: Redirigir al usuario o limpiar el formulario
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
      setLoading(false);
    }
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
          <button className="blue-Button" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
          <ToastContainer />
        </form>
      </div>
    </>
  );
};

export default ProfileUpdateForm;
