import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
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

    try {
      //llamar al servicio de login
      const response = await loginService({
        email,
        password,
      });

      setToken(response.data.token);
      setResp(response);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
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
        <input type="submit" value="Log in" />
      </div>

      <div>
        <Link to="/users/recover-password">Recover Password</Link>
      </div>

      <div>{error && <p>{error}</p>}</div>
      <div>{resp.status === "ok" && <p>{resp.message}</p>}</div>
    </form>
  );
}

export default FormLogin;
