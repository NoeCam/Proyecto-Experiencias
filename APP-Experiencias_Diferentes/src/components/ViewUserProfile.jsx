import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";

import { ToastContainer, toast } from "react-toastify";

const ViewUserProfile = () => {
  const { userLogged, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    logout();

    navigate("/users/login");
  };

  return userLogged ? (
    <>
      <ToastContainer />
      <h1 className="flex font-titleLicorice text-5xl font-black justify-center text-white tracking-wider mt-5">
        E<span className="text-yellow-500">x</span>periencias
      </h1>
      <h2 className="flex font-titleLicorice text-5xl font-black justify-center text-white tracking-wider mb-3">
        {" "}
        <span className="text-cyan-500">D</span>iferentes
      </h2>
      <h3 className="h3">View your User Profile</h3>
      <div className="flex sm:justify-center ">
        <div className="div-content">
          <img
            className="w-56 bg-contain mb-5 rounded-full"
            src={
              userLogged.avatar
                ? `${import.meta.env.VITE_API_URL}/uploads/${userLogged.avatar}`
                : "/userDefault.png"
            }
            alt="User Avatar"
          />
          <p className="mb-3">
            <span className="font-bold"> Username:</span> {userLogged.username}
          </p>
          <p className="mb-3">
            <span className="font-bold">First name:</span>{" "}
            {userLogged.firstname}
          </p>
          <p className="mb-3">
            <span className="font-bold">Last name:</span> {userLogged.lastname}
          </p>
          <p className="mb-3">
            <span className="font-bold">E-mail:</span> {userLogged.email}
          </p>
          {/* Botón para ir a la página de visualización de experiencias reservadas como usuario */}
          {userLogged?.role && userLogged.role === "normal" ? (
            <button
              className="blue-Button"
              onClick={() => navigate("/experiencias/reservedExperiences")}
            >
              Check your reservations
            </button>
          ) : (
            ""
          )}

          {/* Botón para ir a la página de visualización de experiencias reservadas como Administrador */}
          {userLogged?.role && userLogged.role === "admin" ? (
            <>
              <p className="mb-3">
                <span className="font-bold">Role:</span> {userLogged.role}
              </p>
              <button
                className="blue-Button"
                onClick={() => navigate("/admin/experiences")}
              >
                Reservations of your Experiences
              </button>
            </>
          ) : (
            ""
          )}

          {/* Botón para ir a la página de edición del perfil */}
          <button
            className="blue-Button"
            onClick={() => navigate("/users/edit-profile")}
          >
            Edit Profile
          </button>
          {/* Botón para ir a la página de cambio de contraseña */}
          <button
            className="blue-Button"
            onClick={() => navigate("/users/change-password")}
          >
            Change Password
          </button>
          <button
            className="blue-Button"
            type="submit"
            value="logout"
            onClick={handleSubmit}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  ) : (
    <div>{error ? <p>{error}</p> : ""}</div>
  );
};

export default ViewUserProfile;
