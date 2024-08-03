import { useState } from "react";
import changeRecoverPasswordService from "../services/changeRecoverPasswordService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangeRecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [recoverPassCode, setRecoverPassCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== newPasswordRepeat) {
      toast.error("Passwords are different");
      return;
    }

    try {
      const data = { email, recoverPassCode, newPassword };
      const json = await changeRecoverPasswordService(data);

      toast.success("Password successfully changed");

      // Añadir un retraso de 3 segundos antes de navegar a "/users/login"
      setTimeout(() => {
        navigate("/users/login");
      }, 3000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <h1 className="flex font-titleLicorice text-5xl font-black justify-center text-white tracking-wider mt-5">
        E<span className="text-yellow-500">x</span>periencias
      </h1>
      <h2 className="flex font-titleLicorice text-5xl font-black justify-center text-white tracking-wider mb-3">
        {" "}
        <span className="text-cyan-500">D</span>iferentes
      </h2>
      <div className="flex sm:justify-center ">
        <div className="div-content">
          <div>
            <h4 className="font-bold text-center mb-5">
              Check your email to get the password recovery code
            </h4>
          </div>
          <form className="mx-8 sm:m-0" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="">Email</label>
              <input
                className="input"
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Recovery code</label>
              <input
                className="input"
                type="text"
                name="recoverPassCode"
                onChange={(e) => setRecoverPassCode(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Enter new password</label>
              <input
                className="input"
                type="password"
                name="newPassword"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Repeat your password</label>
              <input
                className="input"
                type="password"
                name="newPasswordRepeat"
                onChange={(e) => setNewPasswordRepeat(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button className="blue-Button">Confirm</button>
              {error ? <p>{error}</p> : ""}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangeRecoverPassword;
