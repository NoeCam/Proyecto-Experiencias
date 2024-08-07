import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { changePasswordService } from "../services/changePasswordService.js";

const ChangePasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match");
      return;
    }

    try {
      await changePasswordService({ newPassword, confirmPassword });
      toast.success("Password changed successfully");
      setTimeout(() => {
        navigate("/users/profile");
      }, 3000);
    } catch (error) {
      toast.error("Error changing password");
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
      <h3 className="h3">Change Password</h3>
      <div className="flex text-center justify-center">
        <div className="div-content">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                className="input"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm New Password:</label>
              <input
                type="password"
                className="input"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="password-guidelines">
              <h2 className="font-bold text-lg my-3">For a secure password:</h2>
              <ul>
                <li>Use at least 8 characters</li>
                <li>Include at least one uppercase letter</li>
                <li>Include at least one lowercase letter</li>
                <li>Include at least one number</li>
                <li>Include at least one special character (e.g., ?!$)</li>
              </ul>
            </div>
            <button className="blue-Button" type="submit">
              Change Password
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ChangePasswordForm;
