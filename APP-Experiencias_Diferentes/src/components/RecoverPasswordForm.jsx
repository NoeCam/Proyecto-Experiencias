import { useState } from "react"
import { useNavigate } from "react-router-dom";
import setRecoverPasswordService from "../services/setRecoverPasswordService";

const RecoverPasswordForm = () => {

    const [email, setEmail] = useState('');

    const [error, setError] = useState('');

    const [resp, setResp] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const rta = await setRecoverPasswordService(email);
            //setRta(rta.message);
            //navegar a una vista para modificar el password
            navigate('/user/modify-password');

        } catch (error) {
            setError(error.message);
        }
    }

  return (
    <>
        <h3>Recover password</h3>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="">Email</label>
                <input type="email" name="email" value={ email } onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <button>Send</button>
            { error ? <p>{ error }</p> : ''}
            { resp.status == 'ok' ? <p>{resp}</p> : ''}
        </form>
    </>
  )
}

export default RecoverPasswordForm