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
      //setResp(response);

      // Muestra un mensaje de éxito si el registro es exitoso
      if (response.status == "ok") {
        toast.success(response.message);
        setTimeout(() => {
          navigate("/");
        }, 2000); // 2000 milisegundos = 2 segundos
      } else {
        // Muestra un mensaje de error si el login falla
        toast.error("Login failed");
      }
    } catch (error) {
      toast.error(error.message);
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
      <h3 className="h3">Login</h3>
      <div className="flex sm:justify-center ">
        <div className="div-content">
          <form className="mx-8 sm:m-0" onSubmit={handleFormSubmit}>
            <label htmlFor="email">Email</label>
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Enter an email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              className="input"
              type="password"
              name="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="text-center">
              <input className="blue-Button" type="submit" value="Log in" />

              <Link className="blue-Button" to="/users/recover-password">
                Recover Password
              </Link>
            </div>

            <div>{error && <p>{error}</p>}</div>
            <div>{resp.status === "ok" && <p>{resp.message}</p>}</div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default FormLogin;
