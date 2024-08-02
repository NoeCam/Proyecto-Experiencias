import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import validateUserService from "../services/validateUserService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const UserValidation = () => {
  const { registrationCode } = useParams();
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    const validateUser = async () => {
      try {
        const response = await validateUserService({ registrationCode });
        setResponse(response);
        toast.success("User validated successfully");
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
          <h3 className="h3">The user was validated successfully.</h3>
          <div className="div-content">
            <h4>Go to Login</h4>
            <div>
              <Link className="blue-Button" to={"/users/login"}>
                <p>Login</p>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <h3 className="h3">There was an error in the validation.</h3>
          <div className="div-content">
            <p>{response.message}</p>
            <div>
              <Link className="blue-Button" to={"/users/login"}>
                Login
              </Link>
              <Link className="blue-Button" to={"/"}>
                Home
              </Link>
            </div>
          </div>
        </>
      )}

      <div>{error && <p>{error}</p>}</div>
    </>
  );
};

export default UserValidation;
