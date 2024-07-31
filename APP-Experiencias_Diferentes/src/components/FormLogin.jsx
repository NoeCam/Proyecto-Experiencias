import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

// Importa los componentes ToastContainer y toast de react-toastify para mostrar notificaciones
import { ToastContainer, toast } from "react-toastify";

import { AuthContext } from "../contexts/AuthContextProvider.jsx";
import loginService from "../services/loginService.js";

function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resp, setResp] = useState("");

  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  //manejo del formulario
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Verifica si todos los campos están llenos
    if ([email, password].includes("")) {
      toast.error("All fields are required"); // Muestra un mensaje de error si algún campo está vacío
      return;
    }

    try {
      //llamar al servicio de login
      const response = await loginService({
        email,
        password,
      });

      setToken(response.data.token);
      setResp(response);

      // Muestra un mensaje de éxito si el registro es exitoso
      if (response.status == "ok") {
        toast.success(response.message);
        navigate("/");
      } else {
        // Muestra un mensaje de error si el registro falla
        toast.error("Login failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <h3 className="h3">Login</h3>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter an email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Pasword</label>
          <input
            type="password"
            name="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <input className="blue-Button" type="submit" value="Log in" />
        </div>

        <div>
          <Link className="blue-Button" to="/users/recover-password">
            Recover Password
          </Link>
        </div>

        <div>{error && <p>{error}</p>}</div>
        <div>{resp.status === "ok" && <p>{resp.message}</p>}</div>
      </form>
      <ToastContainer />
    </>
  );
}

export default FormLogin;
