import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileUpdateForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Cargar datos del perfil cuando el componente se monta
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/users/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Añadir el token aquí
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setEmail(userData.email);
          setUsername(userData.username);
          setFirstname(userData.firstname);
          setLastname(userData.lastname);
        } else {
          console.error("Failed to load user data");
          toast.error("Failed to load user data");
        }
      } catch (error) {
        console.error("Error loading user data", error);
        toast.error("Error loading user data");
      }
    };

    fetchUserData();
  }, []);

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Añadir el token aquí
        },
        body: JSON.stringify({
          email,
          username,
          firstname,
          lastname,
          password,
          newPassword,
        }),
      });

      if (response.ok) {
        toast.success("Profile updated successfully");
      } else {
        const textResponse = await response.text();
        let errorData = {};

        if (textResponse) {
          try {
            errorData = JSON.parse(textResponse); // Intentar analizar JSON
          } catch (jsonError) {
            console.error("Failed to parse error response as JSON", jsonError);
            toast.error("Failed to parse error response");
            return; // Salir si no se puede analizar el JSON
          }
        } else {
          console.error("Received empty error response");
          toast.error("Received empty error response");
          return;
        }

        toast.error(
          `Failed to update profile: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error("Error updating profile");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Profile</h2>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        First Name:
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
      </label>
      <label>
        Current Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        New Password:
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </label>
      <button type="submit">Update Profile</button>
      <ToastContainer />
    </form>
  );
};

export default ProfileUpdateForm;
