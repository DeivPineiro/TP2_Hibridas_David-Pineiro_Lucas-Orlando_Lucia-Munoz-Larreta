import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:2023/api/account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then((res) => res.json())
            .then((result) => {
                if(result.status == 201)
                {
                console.log(result);
                navigate('/login', { replace: true });
                }
                else{
                    alert("Error al registrarse, contraseña ya existe o error al contactar con el servidor")
                }
            });
    }
    return (
        <>
        <div className="register-container">
            <h1 className="register-title">Registro</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" required onChange={handleEmail} value={email} className="form-input" />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input type="password" required onChange={handlePassword} value={password} className="form-input" />
        </div>
        <button type="submit" className="register-button">Registrarse</button>
      </form>
            </div>
        </>

    )

}

export default Register

