import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContextProvider";

const Header = () => {
  const { userLogged } = useContext(AuthContext);

  return (
    <>
      <header>
        {!userLogged ? (
          <nav>
            <Link to="/">Home</Link>
            <>&nbsp;|&nbsp;</>
            <Link to="/users/register">Sing in</Link>
            <>&nbsp;|&nbsp;</>
            <Link to="/users/login">Login</Link>
          </nav>
        ) : (
          ""
        )}
        {userLogged ? (
          <nav>
            <Link to="/">Home</Link>
            <>&nbsp;|&nbsp;</>
            <Link to="/users/profile">{userLogged.username}</Link>
            {userLogged?.role && userLogged.role === "admin" ? (
              <>
                &nbsp;|&nbsp;
                <Link to="/experiencias/create">Create a new experience</Link>
              </>
            ) : (
              ""
            )}
          </nav>
        ) : (
          ""
        )}
      </header>
    </>
  );
};

export default Header;
