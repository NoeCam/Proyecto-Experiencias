import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContextProvider";

const Header = () => {
  const { userLogged } = useContext(AuthContext);

  return (
    <>
      {!userLogged ? (
        <nav className="flex justify-around w-full">
          <Link to="/">
            <img className="icon-NavBar" src="/iconHome.svg" alt="Home" />
            <p className="text-NavBar">Home</p>
          </Link>
          <>&nbsp;</>
          <Link to="/users/register">
            <img className="icon-NavBar" src="/iconNewUser.svg" alt="Sing in" />
            <p className="text-NavBar">Sing in</p>
          </Link>
          <>&nbsp;</>
          <Link to="/users/login">
            <img
              className="icon-NavBar"
              src="/iconUserProfile.svg"
              alt="Login"
            />
            <p className="text-NavBar">Login</p>
          </Link>
        </nav>
      ) : (
        ""
      )}
      {userLogged ? (
        <nav className="flex justify-around w-full">
          <Link to="/">
            <img className="icon-NavBar" src="/iconHome.svg" alt="Home" />
            <p className="text-NavBar">Home</p>
          </Link>

          {userLogged?.role && userLogged.role === "admin" ? (
            <>
              &nbsp;
              <Link to="/experiencias/create">
                <img
                  className="icon-NavBar"
                  src="/iconPlus.svg"
                  alt="Create a new experience"
                />
                <p className="text-NavBar">Create a new experience</p>
              </Link>
            </>
          ) : (
            ""
          )}

          <>&nbsp;</>
          <Link to="/users/profile">
            <img
              className="icon-NavBar"
              src="/iconUserProfile.svg"
              alt={userLogged.username}
            />
            <p className="text-NavBar">{userLogged.username}</p>
          </Link>
        </nav>
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
