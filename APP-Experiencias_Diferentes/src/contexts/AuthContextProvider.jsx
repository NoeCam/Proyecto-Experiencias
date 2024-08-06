import { createContext, useState, useEffect } from "react";
import getDataUserLoggedService from "../services/getDataUserLoggedService";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userLogged, setUserLogged] = useState(null);

  useEffect(() => {
    // Para traer el valor del token que se encuentre en localstorage
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    // Para traer los datos del usuario logueado
    const getDataUserLogged = async () => {
      try {
        const data = await getDataUserLoggedService(token);
        setUserLogged(data);
      } catch (error) {
        logout();
      }
    };
    if (token) getDataUserLogged();
  }, [token]);

  const logout = () => {
    setToken("");
    setUserLogged(null);
  };

  // Nueva función para actualizar los datos del usuario
  const updateUserLogged = (updatedData) => {
    setUserLogged((prevUser) => ({
      ...prevUser,
      ...updatedData,
    }));
  };

  return (
    <AuthContext.Provider
      value={{ token, userLogged, setToken, logout, updateUserLogged }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
