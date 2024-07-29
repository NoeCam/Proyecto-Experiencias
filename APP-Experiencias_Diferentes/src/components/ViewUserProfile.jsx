import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";
import Header from "./Header";

const ViewUserProfile = () => {
  const { userLogged, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    logout();

    navigate("/users/login");
  };

  return userLogged ? (
    <>
      <Header />
      <h3>View your User Profile</h3>
      <img
        src={
          userLogged.avatar
            ? `${import.meta.env.VITE_API_URL}/uploads/${userLogged.avatar}`
            : `${import.meta.env.VITE_API_URL}/uploads/userDefault.png`
        }
        alt="User Avatar"
      />
      <p>Username: {userLogged.username}</p>
      <p>First name: {userLogged.firstname}</p>
      <p>Last name: {userLogged.lastname}</p>
      <p>email: {userLogged.email}</p>
      <p>role: {userLogged.role}</p>
      <button type="submit" value="logout" onClick={handleSubmit}>
        Logout
      </button>
      {/* Botón para ir a la página de edición del perfil */}
      <button onClick={() => navigate("/users/edit-profile")}>
        Edit Profile
      </button>
    </>
  ) : (
    <Header />
  );
};

export default ViewUserProfile;
