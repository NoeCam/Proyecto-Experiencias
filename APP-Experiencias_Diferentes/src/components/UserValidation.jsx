import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import validateUserService from "../services/validateUserService";

const UserValidation = () => {
  const { registrationCode } = useParams();
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    const validateUser = async () => {
      try {
        const response = await validateUserService({ registrationCode });
        setResponse(response);
      } catch (error) {
        setError(error.message);
      }
    };

    validateUser();
  }, [registrationCode]);

  return (
    <>
      <div>
        {response.status == "ok" ? (
          <>
            <h2>The user was validated succesfully.</h2>
            <h3>Go to Login</h3>
            <div>
              <Link to={"/users/login"}>
                <p>Login</p>
              </Link>
            </div>
          </>
        ) : (
          <>
            <h3>There was an error in the validation.</h3>
            <p>{response.message}</p>
            <div>
              <Link to={"/users/login"}>Login</Link>
              <>&nbsp;|&nbsp;</>
              <Link to={"/"}>Home</Link>
            </div>
          </>
        )}
      </div>
      <div>{error ? <p>{error}</p> : ""}</div>
    </>
  );
};

export default UserValidation;
