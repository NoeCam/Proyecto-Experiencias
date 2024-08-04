import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";

import validateUserService from "../services/validateUserService";
import "react-toastify/dist/ReactToastify.css";

const UserValidation = () => {
  const { registrationCode } = useParams();
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const validateUser = async () => {
      try {
        const response = await validateUserService({ registrationCode });
        setResponse(response);

        if (response.status == "ok") {
          toast.success("User validated successfully");
          setError("");
          setTimeout(() => {
            navigate("/users/login");
          }, 2000);
        }
      } catch (error) {
        setError(error.message);
        toast.error("Error validating user: " + error.message);
      }
    };

    validateUser();
  }, [registrationCode]);

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
      {response.status === "ok" ? (
        <>
          <div className="flex sm:justify-center ">
            <div className="div-content">
              <h3 className="font-bold">The user was validated succesfully.</h3>
              <h4 className="text-center">
                The page will be redirected automatically. Otherwise, use the
                following button.
              </h4>
              <div className="mt-5">
                <Link className="blue-Button" to={"/users/login"}>
                  Login
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex sm:justify-center ">
            <div className="div-content">
              <h3 className="font-bold">
                There was an error in the validation.
              </h3>
              <p className="text-center">{response.message}</p>
              <div className="mt-5">
                <Link className="blue-Button" to={"/users/login"}>
                  Login
                </Link>
                <Link className="blue-Button" to={"/"}>
                  Home
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      <div>{error && <p>{error}</p>}</div>
    </>
  );
};

export default UserValidation;
