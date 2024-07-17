import React from "react";
import { Link } from "react-router-dom";

const ModifyPassword = () => {
  return (
    <div>
      <h2>Password change request</h2>
      <p>Check your email</p>
      <p>
        And then go to <Link to={"/users/password"}>change your password</Link>{" "}
        with your code.
      </p>
    </div>
  );
};

export default ModifyPassword;
