import {useState} from "react";
import {useNavigate} from "react-router-dom";
import loginService from "../services/loginService.js";


function FormLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [resp, setResp] = useState("");

    const navigate = useNavigate();

    //manejo del formulario
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            //llamar al servicio de login
            const response = await loginService({
                email,
                password,
            });
            setResp(response);
            navigate("/experiencias");

        } catch (error) {
            setError(error.message);
        }

    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Introduce email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password" 
                    name="Password"
                    value={password}
                    required 
                    onChange={(e) => setPassword(e.target.value)}
                    />
            </div>

            <div>
                <input type="submit" value="Iniciar Sesión" />
            </div>

            <div>{error && <p>{error}</p>}</div>
            <div>{resp.status === "ok" && <p>{resp.message}</p>}</div>
        </form>);
}

export default FormLogin;