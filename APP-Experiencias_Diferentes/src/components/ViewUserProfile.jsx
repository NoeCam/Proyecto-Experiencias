import { useContext, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";

const ViewUserProfile = () => {
  const { userLogged, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    logout();

    navigate("/users/login");
  };

  return userLogged ? (
    <>
      <header>
        <Link to={"/"}>
          <p>Home</p>
        </Link>
      </header>
      <h3>View your User Profile</h3>
      <p>Username: {userLogged.username}</p>
      <p>First name: {userLogged.firstname}</p>
      <p>Last name: {userLogged.lastname}</p>
      <p>email: {userLogged.email}</p>
      <p>role: {userLogged.role}</p>
      <button type="submit" value="logout" onClick={handleSubmit}>
        Logout
      </button>
    </>
  ) : (
    <header>
      <Link to={"/"}>
        <p>Home</p>
      </Link>
      <Link to={"/users/login"}>Login</Link>
    </header>
  );
};

export default ViewUserProfile;
