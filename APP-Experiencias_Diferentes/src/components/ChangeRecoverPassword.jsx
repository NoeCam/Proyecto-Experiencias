import { useState } from "react";
import changeRecoverPasswordService from "../services/changeRecoverPasswordService";
import { useNavigate } from "react-router-dom";

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
      setError("Passwords are different");
      return;
    }

    try {
      const data = { email, recoverPassCode, newPassword };

      const json = await changeRecoverPasswordService(data);

      navigate("/users/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="div-content">
        <div>
          <p>Check your email to get the password recovery code</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">recovery code</label>
            <input
              type="text"
              name="recoverPassCode"
              onChange={(e) => setRecoverPassCode(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Enter new password</label>
            <input
              type="password"
              name="newPassword"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Repeat your password</label>
            <input
              type="password"
              name="newPasswordRepeat"
              onChange={(e) => setNewPasswordRepeat(e.target.value)}
            />
          </div>
          <button>Confirm</button>
          {error ? <p>{error}</p> : ""}
        </form>
      </div>
    </>
  );
};

export default ChangeRecoverPassword;
