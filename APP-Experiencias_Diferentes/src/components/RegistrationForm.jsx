import { useState } from "react";
import registerUserService from "../services/registerUserService";

const RegistrationForm = () => {
  // Estado para cada campo del formulario
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [resp, setResp] = useState("");

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Llamar al servicio de registro de usuario con todos los campos
      const response = await registerUserService({
        username,
        firstname,
        lastname,
        email,
        password,
      });

      setResp(response);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="firstname">First Name:</label>
        <input
          type="text"
          name="firstname"
          placeholder="Enter first name"
          value={firstname}
          required
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastname">Last Name:</label>
        <input
          type="text"
          name="lastname"
          placeholder="Enter last name"
          value={lastname}
          required
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div>
        <input type="submit" value="Send" />
      </div>
      <div>{error && <p>{error}</p>}</div>
      <div>{resp.status === "ok" && <p>{resp.message}</p>}</div>
    </form>
  );
};

export default RegistrationForm;
