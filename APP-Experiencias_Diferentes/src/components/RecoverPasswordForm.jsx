import { useState } from "react";
import { useNavigate } from "react-router-dom";
import setRecoverPasswordService from "../services/setRecoverPasswordService";

const RecoverPasswordForm = () => {
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  const [resp, setResp] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const rta = await setRecoverPasswordService(email);
      //setRta(rta.message);
      //navegar a una vista para modificar el password
      navigate("/users/modify-password");
    } catch (error) {
      setError(error.message);
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
      <h3 className="h3">Recover password</h3>
      <form className="div-content" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Email</label>
          <input
            className="input"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="blue-Button">Send</button>
        {error ? <p>{error}</p> : ""}
        {resp.status == "ok" ? <p>{resp}</p> : ""}
      </form>
    </>
  );
};

export default RecoverPasswordForm;
