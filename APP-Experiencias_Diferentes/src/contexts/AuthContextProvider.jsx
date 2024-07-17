import { createContext, useState, useEffect } from "react";
import getDataUserLoggedService from "../services/getDataUserLoggedService";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") | null);

  const [userLogged, setUserLogged] = useState(null);

  useEffect(() => {
    // para traer el valor del token que se encuentre en localstorage
    localStorage.setItem("token", token);
  }, [token]); //quiero seterarlo la primera vez y cada vez que se actualice el token

  useEffect(() => {
    //para traer los datos del usuario logueado
    const getDataUserLogged = async () => {
      try {
        const data = await getDataUserLoggedService(token);

        setUserLogged(data);
      } catch (error) {
        console.log(error);
        logout();
      }
    };

    getDataUserLogged();
  }, [token]);

  const logout = () => {
    setToken("");
    setUserLogged(null);
  };

  return (
    <AuthContext.Provider value={{ token, userLogged, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
