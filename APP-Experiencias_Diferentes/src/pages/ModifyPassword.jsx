import React from "react";
import { Link } from "react-router-dom";

const ModifyPassword = () => {
  return (
    <div>
      <h1 className="flex font-titleLicorice text-5xl font-black justify-center text-white tracking-wider mt-5">
        E<span className="text-yellow-500">x</span>periencias
      </h1>
      <h2 className="flex font-titleLicorice text-5xl font-black justify-center text-white tracking-wider mb-3">
        {" "}
        <span className="text-cyan-500">D</span>iferentes
      </h2>

      <h3 className="h3">Password change request</h3>
      <div className="flex sm:justify-center ">
        <div className="div-content">
          <p>
            Check your email, and then go to{" "}
            <Link
              className="text-cyan-500 font-bold text-center"
              to={"/users/password"}
            >
              change your password
            </Link>{" "}
            with your code.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModifyPassword;
